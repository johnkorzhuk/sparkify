import React from "react"
import { Icon } from "antd"
import styled from "styled-components"

export const CloseCircle = styled(({ hasInput, ...props }) => (
  <Icon type="close-circle" {...props} />
))`
  color: rgba(0, 0, 0, 0.25);
  font-size: 12px;
  cursor: ${({ hasInput }) => (hasInput ? "pointer" : "default")};
  transition: color 0.3s ease, opacity 0.15s ease;
  opacity: ${({ hasInput }) => (hasInput ? 1 : 0)};

  &:hover {
    color: rgba(0, 0, 0, 0.45);
  }
`

export const StatusApproved = props => {
  return <Icon type="check-circle-o" {...props} />
}

export const StatusPending = props => {
  return <Icon type="exclamation-circle-o" {...props} />
}

export const StatusDeclined = props => {
  return <Icon type="close-circle-o" {...props} />
}

export const Edit = props => {
  return <Icon type="edit" {...props} />
}

export const Delete = props => {
  return <Icon type="delete" {...props} />
}
