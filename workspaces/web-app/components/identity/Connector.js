import React, { useState, useEffect } from 'react'
import { Telepath } from '@cogitojs/telepath-js'
import { CogitoConnector } from '@cogitojs/cogito-react-ui'

const Connector = ({
  onDone = () => {},
  title,
  disabled
}) => {
  const [open, setOpen] = useState(false)
  const [telepathChannel, setTelepathChannel] = useState(null)

  const getConnectUrl = () => {
    return telepathChannel.createConnectUrl('https://cogito.mobi')
  }

  const createChannel = async () => {
    const telepath = new Telepath('https://telepath.cogito.mobi')
    const telepathChannel = await telepath.createChannel({ appName: 'Hush Hush' })
    setTelepathChannel(telepathChannel)
  }

  useEffect(() => {
    createChannel()
  }, [])

  if (!telepathChannel) return null
  return (
    <div css={{ alignSelf: 'center' }}>
      <CogitoConnector open={open}
        buttonText={title}
        buttonDisabled={disabled}
        buttonStyling={{ primary: true }}
        connectUrl={getConnectUrl()}
        onOpen={() => setOpen(true)}
        onDone={() => {
          setOpen(false)
          onDone(telepathChannel)
        }}
        onCancel={() => setOpen(false)} />
    </div>
  )
}

export { Connector }
