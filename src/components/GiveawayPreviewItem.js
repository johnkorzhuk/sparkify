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
  transition: box-shadow 200ms linear, transform 200ms linear;

  &:hover {
    box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.35);
    transform: scale(1.01) translateY(-5px);
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
  }

  > .type-icon {
    position: absolute;
    right: 10px;
    top: 10px;
  }
`

const Value = styled.span`
  font-size: 20px;
  font-weight: bold;
  padding-bottom: 5px;
`

const Title = styled.h3`
  color: rgba(0, 0, 0, 0.45);
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
  const categoryRoot = category.split("/")[0]
  const { gradient, Icon: CategoryIcon } = CATEGORY_RESOURCES[categoryRoot]
  const { Icon: TypeIcon } = TYPE_RESOURCES[type]
  console.log(endDate)
  return (
    <Card gradient={gradient}>
      <CardIconContainer>
        <CategoryIcon color="white" />
        <CardCountdownContaner>
          <Countdown date={endDate} renderer={countdownRenderer} />
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
