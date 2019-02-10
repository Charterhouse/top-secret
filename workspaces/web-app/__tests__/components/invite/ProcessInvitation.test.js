import React from 'react'
import { ProcessInvitation } from '../../../components/invite/ProcessInvitation'
import { Inviter } from '../../../components/crypto'
import { render, waitForElement, fireEvent } from 'react-testing-library'

describe('ProcessInvitation', () => {
  beforeEach(() => {
    console.log = jest.fn()
    Inviter.accept = jest.fn().mockResolvedValueOnce()
  })

  afterEach(() => {
    console.log.mockRestore()
  })

  const renderProcessInvitation = () => {
    return render(<ProcessInvitation invitation='tag.key.nonce' />)
  }

  it.only('shows confiramtion when invitation was accepted', async () => {
    jest.useFakeTimers()
    const { getByText } = renderProcessInvitation()
    jest.advanceTimersByTime(3000)
    await waitForElement(() => getByText(/invitation looks/i))
    jest.useRealTimers()
    const acceptButton = await waitForElement(() => getByText('Accept...'))
    fireEvent.click(acceptButton)
    const doneButton = await waitForElement(() => getByText('Done'))
    fireEvent.click(doneButton)
    await waitForElement(() => getByText(/accepted/i))
    expect(getByText(/the invitation/i)).toBeInTheDocument()
  })
})
