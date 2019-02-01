import React from 'react'
import styled from '@emotion/styled'
import { AnimationBox } from './AnimationBox'

const FadingValueWrapper = styled.div(props => {
  const style = {
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'flex-start',
    justifyContent: 'center'
  }
  if (props.opacity === 0) {
    return {
      ...style,
      opacity: 0
    }
  } else {
    return {
      ...style,
      opacity: props.opacity,
      transition: 'opacity 1s ease-in-out 0s'
    }
  }
})

const FadingValueBox = ({ trigger, children }) => (
  <AnimationBox startValue={0}
    stopValue={1}
    key={trigger}>
    {
      opacity =>
        <FadingValueWrapper opacity={opacity}>
          {children}
        </FadingValueWrapper>
    }
  </AnimationBox>
)

export { FadingValueBox }