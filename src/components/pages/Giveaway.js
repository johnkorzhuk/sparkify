import React from "react"
import { Button } from "antd"
import styled from "styled-components"
import { Link } from "react-router-dom"

import { CATEGORY_RESOURCES, TYPE_RESOURCES } from "../../config"

import { Container as DefaultContainer } from "../styled"
import Countdown from "../common/Countdown"
import ViewMoreCarousel from "../../containers/ViewMoreCarousel"

const GiveawayContainer = styled.div`
  height: 500px;
  ${({ gradient }) => gradient};
  border-radius: 16px;
  position: relative;
  display: flex;
`

const ImageContainer = styled.div`
  background-image: ${({ image }) => `url("${image}")`};
  background-repeat: no-repeat;
  background-size: cover;
  flex-basis: 50%;
  flex: 1;
  border-top-left-radius: 16px;
  border-bottom-left-radius: 16px;
`

const ContentContainer = styled.div`
  color: white;
  padding: 40px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  font-size: 16px;
  flex: 1;

  > h3 {
    font-size: 2em;
    color: inherit;
    text-transform: capitalize;
    font-weight: bold;
  }

  > p {
    font-size: 1.2em;
  }

  > p,
  span {
    text-transform: capitalize;
  }

  > .ant-btn {
    margin-top: 40px;
    max-width: 200px;
    font-size: 1.2em;
  }
`

const SeeAllContainer = DefaultContainer.extend`
  display: flex;
  justify-content: center;
`

const PromoContainer = DefaultContainer.extend`
  margin-top: 160px;
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;

  h3 {
    color: #333;
    font-size: 20px;
    margin-bottom: 20px;
  }
`

const StyledCarousel = styled(ViewMoreCarousel)`
  margin-top: 120px;

  > h3 {
    color: #333;
    font-size: 18px;
  }
`

const countdownRenderer = ({ days, hours, minutes, seconds }) => {
  if (days === 0) {
    return (
      <span>
        Ending In: {hours}:{minutes}:{seconds}
      </span>
    )
  }
  return (
    <span>
      Ending In: {days} {days > 1 ? "days" : "day"}
    </span>
  )
}

const GiveawayPage = ({
  category,
  images,
  title,
  description,
  value,
  type,
  location,
  link,
  endDate,
}) => {
  const { gradient } = CATEGORY_RESOURCES[category]

  return (
    <div>
      <DefaultContainer>
        <GiveawayContainer gradient={gradient}>
          <ImageContainer image={images[0]} />
          <ContentContainer>
            <h3>{title}</h3>
            <p>{description}</p>
            <span>Value: ${value}</span>
            <span>Sponsor: {type}</span>
            <span>Location: {location}</span>
            <Countdown date={endDate} renderer={countdownRenderer} />
            <Button href="#" type="primary" size="large">
              Enter Giveaway
            </Button>
          </ContentContainer>
        </GiveawayContainer>
      </DefaultContainer>
      <StyledCarousel
        heading="More giveaways like this"
        itemWidth={200}
        marginX={10}
      />
      <SeeAllContainer>
        <Link to="/giveaways">
          <Button type="primary" size="large">
            See All Giveaways
          </Button>
        </Link>
      </SeeAllContainer>
      <PromoContainer>
        <h3>Want to promote your giveaway with Sparkify?</h3>
        <Link to="/faq">
          <Button type="primary" size="large">
            Learn More
          </Button>
        </Link>
      </PromoContainer>
    </div>
  )
}

export default GiveawayPage
