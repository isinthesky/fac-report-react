import React from 'react'
import { MiniButton } from '../static/componentSet'

export function ImageButton(clickEvent:any) {
  return (
    <MiniButton onClick={clickEvent&&clickEvent}>util</MiniButton>
  )
}
