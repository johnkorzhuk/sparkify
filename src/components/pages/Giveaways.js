import React from "react"
import { Row, Col, Button } from "antd"
import styled from "styled-components"

import GiveawayFilters from "../../containers/GiveawayFilters"
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
  list-style: none;
`

const StyledButton = styled(Button)`
  margin-top: 10px;
`

const Giveaways = ({ giveaways, resetAllFilters, hasChanged }) => {
  const gutter = 32

  return (
    <Container>
      <StyledRow>
        <GiveawayFilters />
        <StyledButton
          type="dashed"
          size="small"
          onClick={resetAllFilters}
          disabled={!hasChanged}
        >
          Reset All
        </StyledButton>
      </StyledRow>
      <ItemContainer gutter={gutter}>
        {giveaways &&
          giveaways.map(giveaway => (
            <StyledCol key={giveaway.id} span={6} gutter={gutter}>
              <GiveawayItem {...giveaway} />
            </StyledCol>
          ))}
      </ItemContainer>
    </Container>
  )
}

export default Giveaways
