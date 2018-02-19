import React from "react"
import { Icon } from "antd"
import styled from "styled-components"

const StyledIcon = styled(Icon)`
  font-size: 20px;
  color: ${({ color }) => color};
`

export const Facebook = ({ color, ...props }) => (
  <StyledIcon {...props} color={color} type="facebook" />
)
export const Rafflecopter = ({ color, ...props }) => (
  <StyledIcon {...props} color={color} type="weibo" />
)
export const Gleam = ({ color, ...props }) => (
  <StyledIcon {...props} color={color} type="dingding" />
)
export const GiveawayTools = ({ color, ...props }) => (
  <StyledIcon {...props} color={color} type="tool" />
)
export const KingSumo = ({ color, ...props }) => (
  <StyledIcon {...props} color={color} type="gitlab" />
)
export const Instagram = ({ color, ...props }) => (
  <StyledIcon {...props} color={color} type="amazon" />
)
export const Twitter = ({ color, ...props }) => (
  <StyledIcon {...props} color={color} type="twitter" />
)
export const Youtube = ({ color, ...props }) => (
  <StyledIcon {...props} color={color} type="youtube" />
)
export const EmailSubscription = ({ color, ...props }) => (
  <StyledIcon {...props} color={color} type="mail" />
)
export const CommentEntry = ({ color, ...props }) => (
  <StyledIcon {...props} color={color} type="qq" />
)
