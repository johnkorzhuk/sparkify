import React, { Fragment } from "react"
import styled from "styled-components"
import { Popconfirm, Icon, Popover } from "antd"

import { CATEGORY_RESOURCES, statusCodes } from "../../config"

import {
  StatusApproved,
  StatusDeclined,
  StatusPending,
  Edit,
  Delete,
} from "../icons/index"
import Countdown from "../common/Countdown"

const PRIMARY_COLOR = "#444"

const Container = styled.div`
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  position: relative;
`

const Item = styled.span`
  margin-left: 20px;
  width: ${({ width }) => width};

  &:first-child {
    margin-left: 0;
  }

  &:last-child {
    margin-right: 15px;
    margin-left: 0;
    padding-left: 20px;
    padding-right: 10px;
  }
`

const ActionItemsContainer = Item.withComponent("div").extend`
  display: flex;
`

const ActionItem = styled.div`
  &:first-child {
    margin-right: 20px;
  }
`

const ActionIcon = styled(({ Icon, disabled, ...props }) => (
  <Icon {...props} />
))`
  font-size: 14px;
  color: ${({ disabled }) =>
    disabled ? "rgba(0, 0, 0, 0.25)" : PRIMARY_COLOR};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
`

const CategoryIcon = styled(({ Icon, ...props }) => <Icon {...props} />)`
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
  approvalStatus,
}) => {
  const approved = approvalStatus.status === 200

  return (
    <ActionItemsContainer width={width}>
      {!ended && (
        <ActionItem>
          <ActionIcon
            Icon={Edit}
            disabled={approved}
            onClick={() => {
              if (!approved) onEditGiveaway(id)
            }}
          />
        </ActionItem>
      )}
      {!ended && (
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
          <ActionItem>
            <ActionIcon Icon={Delete} />
          </ActionItem>
        </Popconfirm>
      )}
    </ActionItemsContainer>
  )
}

const Status = ({ ended, approvalStatus }) => {
  const status = `${statusCodes[approvalStatus.status]
    .slice(0, 1)
    .toUpperCase()}${statusCodes[approvalStatus.status].slice(
    1,
    statusCodes[approvalStatus.status].length,
  )}`
  const statusContent = (
    <Fragment>
      <span>{approvalStatus.message}</span>
      <br />
      {Object.keys(approvalStatus.errors).length > 0 && (
        <span>
          Click <a>here</a> to find out why.
        </span>
      )}
    </Fragment>
  )

  return (
    <Popover
      placement="topRight"
      arrowPointAtCenter
      title={status}
      content={statusContent}
    >
      <Item width="7%">
        {!ended &&
          approvalStatus.status === 200 && (
            <StatusApproved style={{ color: "green" }} />
          )}
        {!ended &&
          approvalStatus.status === 100 && (
            <StatusPending style={{ color: "orange" }} />
          )}
        {!ended &&
          approvalStatus.status === 400 && (
            <StatusDeclined style={{ color: "red" }} />
          )}
      </Item>
    </Popover>
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
  approvalStatus,
  id,
}) => {
  const { Icon } = CATEGORY_RESOURCES[category]
  const created = pageType === "created"
  const entered = pageType === "entered"
  const ended = Date.parse(endDate) <= Date.now()

  return (
    <Container>
      <Item width="5%">
        <CategoryIcon Icon={Icon} />
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
          approvalStatus={approvalStatus}
        />
      )}
      {created && <Status ended={ended} approvalStatus={approvalStatus} />}
    </Container>
  )
}

export default GiveawayListItem
