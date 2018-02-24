import React from "react"
import ReactCountdown from "react-countdown-now"

const Countdown = ({ date, renderer, onComplete }) => {
  return (
    <ReactCountdown date={date} renderer={renderer} onComplete={onComplete} />
  )
}

export default Countdown
