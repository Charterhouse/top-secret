import React from 'react'
import { Connector } from '../../../components/identity'
import { render, waitForElement, fireEvent } from 'react-testing-library'

describe('Connector', () => {
  it('shows the trigger button', async () => {
    const { getByText } = render(<Connector title='Open...' />)

    await waitForElement(() => getByText('Open...'))
  })

  it('does not show the dialog initially', async () => {
    const { getByText, queryByText } = render(<Connector title='Open...' />)

    await waitForElement(() => getByText('Open...'))
    expect(queryByText(/scan the QR code/i)).toBeNull()
  })

  it('opens the dialog when the button is clicked', async () => {
    const { getByText } = render(<Connector title='Open...' />)

    const button = await waitForElement(() => getByText('Open...'))

    fireEvent.click(button)
    expect(getByText(/scan the QR code/i)).toBeInTheDocument()
  })

  it('calls onDone callback when done button is clicked', async () => {
    let telepathChannel
    const onDone = jest.fn().mockImplementationOnce(channel => {
      telepathChannel = channel
    })
    const { getByText, queryByText } = render(<Connector title='Open...' onDone={onDone} />)

    const triggerButton = await waitForElement(() => getByText('Open...'))

    fireEvent.click(triggerButton)

    const doneButton = getByText('Done')

    fireEvent.click(doneButton)

    expect(queryByText(/scan the QR code/i)).toBeNull()
    expect(onDone).toHaveBeenCalled()
    expect(telepathChannel).toBeDefined()
  })
})
