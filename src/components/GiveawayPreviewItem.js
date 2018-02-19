import React from "react"
import styled, { css } from "styled-components"
import Countdown from "react-countdown-now"

import { CATEGORY_RESOURCES, TYPE_RESOURCES } from "../config"

const Card = styled(({ placeholder, ...props }) => <div {...props} />)`
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
  filter: hue-rotate(0deg)
    grayscale(${({ placeholder }) => (placeholder ? 1 : 0)});
  transition: box-shadow 200ms linear, transform 200ms linear,
    filter 200ms linear;

  &:hover {
    ${({ placeholder }) =>
      !placeholder &&
      css`
        box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.35);
        transform: translateY(-5px);
      `};
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

const Placeholder = styled.div`
  height: 10px;
  width: ${({ width }) => width}px;
  background-color: rgba(0, 0, 0, 0.15);
  border-radius: 2px;
`

const InlinePlaceholderContainer = styled.div`
  display: flex;
  width: 100px;
`

const Title = styled.h3`
  color: rgba(0, 0, 0, 0.55);
  font-size: 12px;
  margin: 0;
`

const PlaceHolderTitle = Placeholder.extend`
  height: 8px;
  margin-top: 10px;

  &:first-child {
    margin-right: 5px;
  }
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

const GiveawayPrevItem = ({
  title,
  category,
  value,
  type,
  endDate,
  placeholder = false,
  allLoaded,
  loading,
}) => {
  let categoryRoot
  let CategoryIcon
  let TypeIcon
  let gradient =
    "background-image: linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)"
  if (!placeholder) {
    categoryRoot = category.split("/")[0]
    gradient = CATEGORY_RESOURCES[categoryRoot].gradient
    CategoryIcon = CATEGORY_RESOURCES[categoryRoot].Icon
    TypeIcon = TYPE_RESOURCES[type].Icon
  }

  const renderPlaceHolders =
    (loading && !allLoaded && placeholder) || !placeholder

  return (
    renderPlaceHolders && (
      <Card gradient={gradient} placeholder={placeholder}>
        {!placeholder && (
          <CardIconContainer>
            <CategoryIcon color="white" />
            <CardCountdownContaner>
              <Countdown date={endDate} renderer={countdownRenderer} />
            </CardCountdownContaner>
          </CardIconContainer>
        )}
        <CardContentContainer>
          {placeholder ? (
            <div>
              <Placeholder width={20} />
              <InlinePlaceholderContainer>
                <PlaceHolderTitle width={60} />
                <PlaceHolderTitle width={20} />
              </InlinePlaceholderContainer>
            </div>
          ) : (
            <div>
              <Value>${value}</Value>
              <Title>{title}</Title>
            </div>
          )}
          {!placeholder && (
            <TypeIcon color="rgba(0, 0, 0, 0.65)" className="type-icon" />
          )}
        </CardContentContainer>
      </Card>
    )
  )
}

export default GiveawayPrevItem
