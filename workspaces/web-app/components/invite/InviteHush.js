import React, { useState, useEffect } from 'react'

import { NoInvitation } from './NoInvitiation'
import { ProcessInvitation } from './ProcessInvitation'

const InviteHush = () => {
  const [invitationOk, setInvitationOk] = useState(false)
  const [invitation, setInvitation] = useState(null)

  useEffect(() => {
    if (window.location.hash) {
      const invitation = window.location.hash.substring(1)
      console.log(invitation)
      setInvitationOk(true)
      setInvitation(invitation)
    }
  })

  if (!invitationOk) {
    return (
      <NoInvitation />
    )
  }

  return (
    <ProcessInvitation invitation={invitation} />
  )
}

export { InviteHush }
