import React from 'react'
import { Encryptor } from '../crypto'
import { IdentityFetcher } from '../identity'
import { FadingValueBox } from '../animations'
import { Button } from 'semantic-ui-react'
import { Textarea } from '../forms'
import { FormatBlue } from './FormatBlue'

class Inviting extends React.Component {
  state = {
    status: 'getting to know your identity...',
    done: false,
    copied: false
  }

  constructor () {
    super()
    this.invitationField = React.createRef()
  }

  log = (...args) => {
    const status = args.map((a, i) => {
      if (a[0] === '$') {
        return <FormatBlue key={i}>{a.slice(1)}</FormatBlue>
      } else {
        return a
      }
    })
    this.setState({ status })
  }

  inviteUser = async () => {
    const { recipient, telepathChannel } = this.props
    const identityInfo = await IdentityFetcher.get(telepathChannel)
    console.log('identityInfo=', identityInfo)
    this.log('You are ', `$${identityInfo.username}`)
    setTimeout(() => {
      this.log('and your id is ', `$${identityInfo.ethereumAddress}`)
      setTimeout(async () => {
        this.log('creating invitation for ', `$${recipient}`)
        const symmetricKey = await Encryptor.invite({
          telepathChannel,
          recipient
        })
        setTimeout(async () => {
          this.setState({ done: true, status: symmetricKey })
          this.setHeight()
        }, 3000)
      }, 3000)
    }, 3000)
  }

  isOS = () => {
    return navigator.userAgent.match(/ipad|iphone/i)
  }

  clearSelection = () => {
    if (window.getSelection) {
      if (window.getSelection().empty) { // Chrome
        window.getSelection().empty()
      } else if (window.getSelection().removeAllRanges) { // Firefox
        window.getSelection().removeAllRanges()
      }
    } else if (document.selection) { // IE?
      document.selection.empty()
    }
  }

  selectText = textarea => {
    let range
    let selection
    if (this.isOS()) {
      range = document.createRange()
      range.selectNodeContents(textarea)
      selection = window.getSelection()
      selection.removeAllRanges()
      selection.addRange(range)
      textarea.setSelectionRange(0, 999999)
    } else {
      textarea.select()
    }
  }

  onCopy = () => {
    const textarea = document.querySelector('#invitation')
    this.selectText(textarea)
    document.execCommand('copy')
    this.clearSelection()
    this.setState({ copied: true })
  }

  setHeight = () => {
    const area = this.invitationField.current
    area.style.height = `${Number.parseInt(area.scrollHeight, 10) + 10}px`
  }

  componentDidMount () {
    this.inviteUser()
  }

  render () {
    return (
      <FadingValueBox trigger={this.state.status}>
        {!this.state.done && <div css={{ width: '100%', textAlign: 'center', wordBreak: 'break-word' }}>
          {this.state.status}
        </div>}
        { this.state.done &&
          <div css={{ display: 'flex', width: '100%', flexFlow: 'column nowrap', alignItems: 'center' }}>
            <div css={{ width: '100%', textAlign: 'center' }}>
              This is the invitation link you need to send to <FormatBlue>{this.props.recipient}</FormatBlue>.
            </div>
            <div css={{ width: '100%', textAlign: 'center', marginBottom: '50px' }}>
              Copy it, paste to your favorite email client and wait for your hush buddy to accept.
            </div>
            <Textarea id='invitation' ref={this.invitationField} css={{ height: 'auto' }} onChange={this.setHeight} value={this.state.status} />
            <div css={{ display: 'flex', justifyContent: 'center', marginTop: '1rem', width: '100%' }}>
              <Button primary onClick={this.onCopy}>{this.state.copied ? 'Copied' : 'Copy to clipboard...'}</Button>
            </div>
          </div>
        }
      </FadingValueBox>
    )
  }
}

export { Inviting }
