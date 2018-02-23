import React from "react"
import styled from "styled-components"
import Countdown from "react-countdown-now"

import { CATEGORY_RESOURCES, TYPE_RESOURCES } from "../config"

const Card = styled.div`
  width: 100%;
  height: 200px;
  ${({ gradient }) => gradient};
  list-style: none;
  margin: 0;
  border-radius: 16px;
  position: relative;
  box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.25);
  box-sizing: border-box;
  cursor: pointer;
  filter: hue-rotate(0deg);
  transition: box-shadow 200ms linear, transform 200ms linear,
    filter 200ms linear;

  &:hover {
    box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.35);
    transform: translateY(-5px);
  }
`

const CardIconContainer = styled.div`
  min-height: 60%;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const CardCountdownContaner = styled.div`
  position: absolute;
  top: 5px;
  right: 16px;
  color: white;

  > span {
    font-weight: bold;
  }
`

const CardContentContainer = styled.div`
  min-height: 40%;
  position: absolute;
  background-color: white;
  color: rgba(0, 0, 0, 0.75);
  bottom: 0;
  right: 0;
  left: 0;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;

  > div {
    padding: 10px 15px;
    text-align: left;
    width: 100%;
    min-height: 30px;
  }

  > .type-icon {
    position: absolute;
    right: 10px;
    top: 10px;
  }
`

const Value = styled.span`
  font-size: 18px;
  padding-bottom: 5px;
`

const Title = styled.h3`
  color: rgba(0, 0, 0, 0.55);
  font-size: 12px;
  margin: 0;
`

const countdownRenderer = ({ days, hours, minutes, seconds }) => {
  if (days === 0) {
    return (
      <span>
        {hours}:{minutes}:{seconds}
      </span>
    )
  }
  return <span>{days}</span>
}

const GiveawayPrevItem = ({ title, category, value, type, endDate }) => {
  const CategoryIcon = CATEGORY_RESOURCES[category].Icon
  const TypeIcon = TYPE_RESOURCES[type].Icon
  const gradient = CATEGORY_RESOURCES[category].gradient

  return (
    <Card gradient={gradient}>
      <CardIconContainer>
        <CategoryIcon color="white" />
        <CardCountdownContaner>
          <Countdown
            date={endDate}
            renderer={countdownRenderer}
            onComplete={(...args) => console.log("done", args)}
          />
        </CardCountdownContaner>
      </CardIconContainer>
      <CardContentContainer>
        <div>
          <Value>${value}</Value>
          <Title>{title}</Title>
        </div>
        <TypeIcon color="rgba(0, 0, 0, 0.65)" className="type-icon" />
      </CardContentContainer>
    </Card>
  )
}

export default GiveawayPrevItem
