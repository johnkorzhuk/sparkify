import React from "react"
import styled from "styled-components"
import { Icon } from "antd"

import { CATEGORY_RESOURCES } from "../../config"

import Countdown from "../common/Countdown"

const Container = styled.div`
  margin-bottom: 30px;
  display: flex;
  align-items: center;
`

const Item = styled.span`
  margin: 0 20px;

  &:first-child {
    margin-left: 0;
  }

  &:last-child {
    margin-left: 0;
  }
`

const ActionItemsContainer = Item.withComponent("div").extend`
  display: flex;
`

const ActionItem = styled.div`
  cursor: pointer;
  &:first-child {
    margin-right: 20px;
  }
`

const StyledIcon = styled(({ Icon, ...props }) => <Icon {...props} />)`
  font-size: 26px;
  color: #444;
`

const countdownRenderer = ({ days, hours, minutes, seconds }) => {
  if (days === 0 && hours === "00" && minutes === "00" && seconds === "00") {
    return <span>Ended</span>
  } else if (days === 0) {
    return (
      <span>
        {hours}:{minutes}:{seconds}
      </span>
    )
  }

  return (
    <span>
      {days} {days > 1 ? "days" : "day"}
    </span>
  )
}

const ActionItems = ({ handleDelete, handleEdit }) => {
  return (
    <ActionItemsContainer>
      <ActionItem>
        <Icon type="edit" color="#999" />
      </ActionItem>
      <ActionItem>
        <Icon type="delete" color="#999" />
      </ActionItem>
    </ActionItemsContainer>
  )
}

const GiveawayListItem = ({
  category,
  title,
  endDate,
  value,
  handleDelete,
  handleEdit,
  pageType,
  createdBy,
}) => {
  const { Icon } = CATEGORY_RESOURCES[category]

  return (
    <Container>
      <Item>
        <StyledIcon Icon={Icon} />
      </Item>
      <Item>${value}</Item>
      <Item>{title}</Item>
      {pageType === "entered" && <Item>{createdBy.username}</Item>}
      <Item>
        <Countdown date={endDate} renderer={countdownRenderer} />
      </Item>
      {pageType === "created" && (
        <ActionItems handleDelete={handleDelete} handleEdit={handleEdit} />
      )}
    </Container>
  )
}

export default GiveawayListItem
