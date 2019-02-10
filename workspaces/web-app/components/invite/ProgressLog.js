import React from 'react'
import { FadingValueBox } from '../animations'

const ProgressLog = ({ status }) => (
  <FadingValueBox trigger={status}>
    <div css={{ width: '100%', textAlign: 'center', wordBreak: 'break-word' }}>
      {status}
    </div>
  </FadingValueBox>
)

export { ProgressLog }
