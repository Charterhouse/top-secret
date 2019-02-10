import React, { useState } from 'react'

import { Red, Green, Blue } from '../ui'

const useLogging = initialMessage => {
  const [status, setStatus] = useState(initialMessage)

  const log = (...args) => {
    const status = args.map((a, i) => {
      if (a.startsWith('[green]')) {
        return <Green key={i}>{a.slice('[green]'.length)}</Green>
      } if (a.startsWith('[blue]')) {
        return <Blue key={i}>{a.slice('[blue]'.length)}</Blue>
      } if (a.startsWith('[red]')) {
        return <Red key={i}>{a.slice('[red]'.length)}</Red>
      } else {
        return a
      }
    })
    setStatus(status)
  }

  return { status, log }
}

export { useLogging }
