import React from "react"
import { Icon } from "antd"
import styled from "styled-components"

const StyledIcon = styled(Icon)`
  font-size: 48px;
  color: ${({ color }) => color};
`

export const Tech = ({ color, ...props }) => (
  <StyledIcon {...props} color={color} type="android" />
)
export const Audio = ({ color, ...props }) => (
  <StyledIcon {...props} color={color} type="customer-service" />
)
export const Books = ({ color, ...props }) => (
  <StyledIcon {...props} color={color} type="book" />
)
export const Services = ({ color, ...props }) => (
  <StyledIcon {...props} color={color} type="smile-o" />
)
export const Gaming = ({ color, ...props }) => (
  <StyledIcon {...props} color={color} type="rocket" />
)
export const Clothing = ({ color, ...props }) => (
  <StyledIcon {...props} color={color} type="skin" />
)
export const Other = ({ color, ...props }) => (
  <StyledIcon {...props} color={color} type="gift" />
)
