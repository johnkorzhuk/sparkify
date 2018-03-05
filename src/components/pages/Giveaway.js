import React, { Fragment } from "react"
import { Button, Form } from "antd"
import styled from "styled-components"
import { Link } from "react-router-dom"

import { CATEGORY_RESOURCES, TYPE_RESOURCES } from "../../config"

import { Container as DefaultContainer } from "../styled"
import GiveawayEdit from "../forms/GiveawayEdit"
import { Edit, Close } from "../icons/index"
import Countdown from "../common/Countdown"
import ViewMoreCarousel from "../../containers/ViewMoreCarousel"

const GiveawayContainer = styled(
  ({ isEditing, gradient, onSubmit, ...props }) =>
    isEditing ? <Form {...props} onSubmit={onSubmit} /> : <div {...props} />,
)`
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

// padding: ${({ isEditing }) => (isEditing ? "40px 25px 40px 55px" : "40px 25px 40px 55px")};
const ContentContainer = styled.div`
  color: white;
  display: flex;
  padding: 40px 25px 40px 55px;
  justify-content: center;
  flex-direction: column;
  font-size: 16px;
  flex: 1;
  position: relative;

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
`

const PrimaryButton = styled(Button)`
  margin-top: 40px !important;
  max-width: 200px !important;
  font-size: 1.2em !important;
`

const Edit_CancelContainer = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
`

const Edit_CancelIcon = styled(({ Icon, ...props }) => <Icon {...props} />)`
  color: white;
  font-size: 26px;
  cursor: pointer;
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
  isEditing,
  isOwner,
  onSubmit,
  onEdit,
  onCancelEdit,
  getFieldDecorator,
  giveaway,
  normFile,
  onUpload,
}) => {
  const {
    category,
    images,
    title,
    description,
    value,
    type,
    location,
    link,
    endDate,
  } = giveaway
  const { gradient } = CATEGORY_RESOURCES[category]

  return (
    <div>
      <DefaultContainer>
        <GiveawayContainer
          gradient={gradient}
          isEditing={isEditing}
          onSubmit={onSubmit}
        >
          <ImageContainer image={images[0]} />
          <ContentContainer isEditing={isEditing}>
            {isOwner && (
              <Edit_CancelContainer>
                {isEditing ? (
                  <Edit_CancelIcon Icon={Close} onClick={onCancelEdit} />
                ) : (
                  <Edit_CancelIcon Icon={Edit} onClick={onEdit} />
                )}
              </Edit_CancelContainer>
            )}

            {isEditing ? (
              <GiveawayEdit
                getFieldDecorator={getFieldDecorator}
                {...giveaway}
                normFile={normFile}
                onUpload={onUpload}
              />
            ) : (
              <Fragment>
                <h3>{title}</h3>
                <p>{description}</p>
                <span>Value: ${value}</span>
                <span>Sponsor: {type}</span>
                <span>Location: {location}</span>
                <Countdown date={endDate} renderer={countdownRenderer} />
                <PrimaryButton href="#" type="primary" size="large">
                  Enter Giveaway
                </PrimaryButton>
              </Fragment>
            )}
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
