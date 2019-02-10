import React, { useState, useEffect } from 'react'
import { Inviter } from '../crypto'

import { useLogging } from '../hooks'

import { ProgressLog } from './ProgressLog'
import { InvitationAccepted } from './InvitationAccepted'
import { InvitationReady } from './InvitationReady'

const ProcessInvitation = ({ invitation }) => {
  const [inProgress, setInProgress] = useState(true)
  const [invitationOk, setInvitationOk] = useState(false)
  const [invitationAccepted, setInvitationAccepted] = useState(false)
  const [crypto, setCrypto] = useState({})

  const { status, log } = useLogging('checking your invitation...')

  const checkInvitation = async () => {
    console.log(invitation)
    try {
      const { tag, symmetricKey, nonce } = Inviter.check(invitation)
      setTimeout(() => {
        setCrypto({
          tag,
          symmetricKey,
          nonce
        })
        setInvitationOk(true)
        setInProgress(false)
      }, 3000)
    } catch (e) {
      setInProgress(true)
      log('[red]Hush! ', e.message)
    }
  }

  const accept = async telepathChannel => {
    try {
      setInProgress(true)
      log('accepting invitation...')
      await Inviter.accept({
        ...crypto,
        telepathChannel,
        onStatusChanged: log
      })
      setTimeout(() => {
        setInProgress(false)
        setInvitationAccepted(true)
      }, 2000)
    } catch (e) {
      setInProgress(true)
      log('[red]Hush! ', e.message)
    }
  }

  useEffect(() => {
    checkInvitation()
  })

  if (inProgress) {
    return <ProgressLog status={status} />
  }
  if (invitationAccepted) {
    return <InvitationAccepted />
  }
  if (invitationOk) {
    return <InvitationReady accept={accept} />
  }
  return null
}

export { ProcessInvitation }
