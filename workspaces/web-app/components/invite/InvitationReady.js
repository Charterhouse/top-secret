import React from 'react'
import Link from 'next/link'
import { Button } from 'semantic-ui-react'
import { FadingValueBox } from '../animations'
import { Connector } from '../identity'
import { Green } from '../ui'

const InvitationReady = ({ accept }) => (
  <FadingValueBox>
    <div css={{ display: 'flex', width: '100%', flexFlow: 'column nowrap', alignItems: 'center' }}>
      <div css={{ width: '100%', textAlign: 'center' }}>
        Invitation looks <Green>good!</Green>
      </div>
      <div css={{ width: '100%', textAlign: 'center', margin: '20px 0 20px 0' }}>
        Do you want to accept it?
      </div>
      <div css={{ display: 'flex', justifyContent: 'center', marginTop: '1rem', width: '100%' }}>
        <Connector onDone={accept}
          title='Accept...' />
        <Link href={{ pathname: '/' }}>
          <Button>Maybe later...</Button>
        </Link>
      </div>
    </div>
  </FadingValueBox>
)

export { InvitationReady }
