import React from "react"
import { Row, Col, Button } from "antd"
import styled from "styled-components"

import GiveawayFilters from "../../containers/GiveawayFilters"
import { Container as DefaultContainer } from "../styled"
import GiveawayItem from "../GiveawayPreviewItem"

const Container = DefaultContainer.extend`
  min-height: 80vh;
`

const StyledRow = styled(Row)`
  max-width: 1000px;
  margin-left: auto !important;
  margin-right: auto !important;
  padding: 0 12px;
`

const ItemContainer = StyledRow.extend`
  margin-top: 60px;
  margin-bottom: 40px;
  padding: 0;
`

const StyledCol = styled(Col)`
  padding-bottom: ${({ gutter }) => `${gutter}px`};
  list-style: none;
`

const FilterButton = styled(Button)`
  margin-top: 10px;
`

const LoadButton = styled(Button)`
  width: 100%;
`

const GUTTER_SIZE = 32

const Giveaways = ({
  giveaways,
  resetAllFilters,
  hasChanged,
  allLoaded,
  loading,
  loadMore,
  itemsPerPage,
  onGiveawayClick,
}) => {
  return (
    <Container>
      <StyledRow>
        <GiveawayFilters />
        <FilterButton
          type="dashed"
          size="small"
          onClick={resetAllFilters}
          disabled={!hasChanged}
        >
          Reset All
        </FilterButton>
      </StyledRow>
      <ItemContainer gutter={GUTTER_SIZE}>
        {giveaways &&
          giveaways.slice(0, itemsPerPage).map((giveaway, index) => {
            return (
              <StyledCol
                key={giveaway.id || index}
                span={6}
                gutter={GUTTER_SIZE}
              >
                <GiveawayItem {...giveaway} onGiveawayClick={onGiveawayClick} />
              </StyledCol>
            )
          })}
      </ItemContainer>
      <StyledRow>
        <Col span={4} offset="10">
          {!allLoaded && (
            <LoadButton
              size="large"
              type="dashed"
              loading={loading}
              onClick={loadMore}
            >
              Load more
            </LoadButton>
          )}
        </Col>
      </StyledRow>
    </Container>
  )
}

export default Giveaways
