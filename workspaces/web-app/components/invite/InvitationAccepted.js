import React from 'react'
import Link from 'next/link'
import { Button } from 'semantic-ui-react'
import { FadingValueBox } from '../animations'
import { Green } from '../ui'

const InvitationAccepted = () => (
  <FadingValueBox>
    <div css={{ display: 'flex', width: '100%', flexFlow: 'column nowrap', alignItems: 'center' }}>
      <div css={{ width: '100%', textAlign: 'center' }}>
        You <Green>accepted</Green> the invitation!
      </div>
      <div css={{ width: '100%', textAlign: 'center', margin: '20px 0 20px 0' }}>
        Now the sender can start hushing with you. Maybe it is worth to remind him?
      </div>
      <Link href={{ pathname: '/' }}>
        <Button primary>Done</Button>
      </Link>
    </div>
  </FadingValueBox>
)

export { InvitationAccepted }
