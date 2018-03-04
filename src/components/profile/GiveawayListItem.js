import React from "react"
import styled from "styled-components"
import { Popconfirm, Icon } from "antd"

import { CATEGORY_RESOURCES } from "../../config"

import { StatusApproved, StatusDeclined, StatusPending } from "../icons/index"
import Countdown from "../common/Countdown"

const PRIMARY_COLOR = "#444"

const Container = styled.div`
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  position: relative;
`

const Item = styled.span`
  margin-right: 20px;
  width: ${({ width }) => width};

  &:last-child {
    margin-right: 0;
    padding-right: 20px;
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
  color: ${PRIMARY_COLOR};
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

const ActionItems = ({
  onDeleteGiveaway,
  onEditGiveaway,
  width,
  id,
  ended,
}) => {
  return (
    <ActionItemsContainer width={width}>
      {!ended && (
        <ActionItem>
          <Icon type="edit" color={PRIMARY_COLOR} />
        </ActionItem>
      )}
      {!ended && (
        <ActionItem>
          <Popconfirm
            title="Are you sure you want to permanently delete this giveaway?"
            onConfirm={() => {
              onDeleteGiveaway(id)
            }}
            okText="Yes"
            cancelText="No"
            placement="topRight"
            arrowPointAtCenter
          >
            <Icon type="delete" color={PRIMARY_COLOR} />
          </Popconfirm>
        </ActionItem>
      )}
    </ActionItemsContainer>
  )
}

const GiveawayListItem = ({
  category,
  title,
  endDate,
  value,
  onDeleteGiveaway,
  onEditGiveaway,
  pageType,
  createdBy,
  declined,
  approved,
  id,
}) => {
  const { Icon } = CATEGORY_RESOURCES[category]
  const created = pageType === "created"
  const entered = pageType === "entered"
  const ended = Date.parse(endDate) <= Date.now()

  return (
    <Container>
      <Item width="5%">
        <StyledIcon Icon={Icon} />
      </Item>
      <Item width="8%">${value}</Item>
      <Item width={created ? "51%" : "45%"}>{title}</Item>
      {entered && (
        <Item width={created ? "30%" : "28%"}>{createdBy.username}</Item>
      )}
      <Item width="15%">
        <Countdown date={endDate} renderer={countdownRenderer} />
      </Item>
      {created && (
        <ActionItems
          onDeleteGiveaway={onDeleteGiveaway}
          onEditGiveaway={onEditGiveaway}
          width="10%"
          id={id}
          ended={ended}
        />
      )}
      {created && (
        <Item width="7%">
          {!ended && approved && <StatusApproved style={{ color: "green" }} />}
          {!ended &&
            !approved &&
            !declined && <StatusPending style={{ color: "orange" }} />}
          {!ended &&
            !approved &&
            declined && <StatusDeclined style={{ color: "red" }} />}
        </Item>
      )}
    </Container>
  )
}

export default GiveawayListItem
