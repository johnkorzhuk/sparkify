import React from "react"
import { Row, Col } from "antd"
import styled from "styled-components"

import GiveawayFilters from "../forms/GiveawaysFilters"
import { Container } from "../styled"
import GiveawayItem from "../GiveawayPreviewItem"

const StyledRow = styled(Row)`
  max-width: 1000px;
  margin-left: auto !important;
  margin-right: auto !important;
  padding: 0 12px;
`

const ItemContainer = StyledRow.extend`
  margin-top: 60px;
  padding: 0;
`

const StyledCol = styled(Col)`
  padding-bottom: ${({ gutter }) => `${gutter}px`};
`

const Giveaways = ({ giveaways }) => {
  const gutter = 24

  return (
    <Container>
      <StyledRow>
        <GiveawayFilters />
      </StyledRow>
      <ItemContainer gutter={gutter}>
        {giveaways.map(giveaway => (
          <StyledCol key={giveaway} span={6} gutter={gutter}>
            <GiveawayItem />
          </StyledCol>
        ))}
      </ItemContainer>
    </Container>
  )
}

export default Giveaways
