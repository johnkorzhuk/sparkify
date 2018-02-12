import React from "react"
import { Card, Icon, Avatar } from "antd"
import styled from "styled-components"

const { Meta } = Card

const StyledMeta = styled(Meta)`
  text-align: center;
`

const GiveawayPrevItem = () => {
  return (
    <Card
      cover={
        <img
          alt="example"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
      }
      actions={[<Icon type="setting" />, <Icon type="ellipsis" />]}
    >
      <StyledMeta title="Card title" />
    </Card>
  )
}

export default GiveawayPrevItem
