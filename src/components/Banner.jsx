import React from 'react'
import Restart from './Restart'

function Banner(props) {
  return (
    <div id="banner" style={{display: props.message === "" ? "none" : "block"}}>
      <div className="message">{props.message}</div>
      <Restart clickRestart={props.clickRestart} />
    </div>
  )
}

export default Banner