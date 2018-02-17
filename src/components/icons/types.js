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
export const Idk = ({ color, ...props }) => (
  <StyledIcon {...props} color={color} type="google" />
)
export const Some = ({ color, ...props }) => (
  <StyledIcon {...props} color={color} type="amazon" />
)
export const Random = ({ color, ...props }) => (
  <StyledIcon {...props} color={color} type="qq" />
)
export const Types = ({ color, ...props }) => (
  <StyledIcon {...props} color={color} type="aliyun" />
)
