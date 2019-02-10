import React from 'react'
import { InviteHush } from '../../../components/invite'
import { render, waitForElement } from 'react-testing-library'

describe('InviteHush', () => {
  beforeEach(() => {
    console.log = jest.fn()
    jest.useFakeTimers()
  })

  afterEach(() => {
    console.log.mockRestore()
  })

  const renderWithHash = (hash = '') => {
    window.location.hash = hash
    return render(<InviteHush />)
  }

  it('renders the info when no invitation fragment is present in the url', () => {
    const { getByText } = renderWithHash()

    expect(getByText(/could not find any potential invitation in your url/i)).toBeInTheDocument()
  })

  it('display error message if invitation hash does not include key component', async () => {
    const { getByText } = renderWithHash('#tag')

    await waitForElement(() => getByText(/missing symmetric key component in the invitation/i))
  })

  it('display error message if invitation hash does not include nonce component', async () => {
    const { getByText } = renderWithHash('#tag.key')

    await waitForElement(() => getByText(/missing nonce component in the invitation/i))
  })

  it('informs the user that invitation looks good if the invitation hash includes all required components', async () => {
    const { getByText } = renderWithHash('#tag.key.nonce')
    jest.advanceTimersByTime(3000)

    await waitForElement(() => getByText(/invitation looks/i))
    expect(getByText(/good/i)).toBeInTheDocument()
  })

  it('informs the user that invitation looks good - snapshot', async () => {
    const { getByText, container } = renderWithHash('#tag.key.nonce')
    jest.advanceTimersByTime(3000)

    await waitForElement(() => getByText(/invitation looks/i))
    expect(container.firstChild).toMatchSnapshot()
  })
})
