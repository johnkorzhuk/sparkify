import React from "react"
import styled from "styled-components"
import ReactIScroll from "react-iscroll"
import iScroll from "iscroll"

import GiveawayPreviewItem from "../GiveawayPreviewItem"

const Container = styled.div`
  overflow-y: hidden;
  max-width: 1260px;
  margin: 0 auto 20px;
  padding: 0 40px;

  @media (min-width: 1300px) {
    padding: 0 20px;
  }
`

const ItemsContainer = styled.div`
  display: flex;
  overflow: hidden;
  width: ${({ items, itemWidth, marginX }) =>
    items * (itemWidth + marginX * 2) + 40}px !important;
  padding: 20px 0;
`

const StyledGiveawayPreviewItem = styled(GiveawayPreviewItem)`
  min-width: ${({ itemWidth }) => itemWidth}px;
  margin: 0 ${({ marginX }) => marginX}px;

  &:first-child {
    margin-left: 15px;
  }

  &:last-child {
    margin-right: 15px;
  }
`

const I_SCROLL_OPTIONS = {
  scrollX: true,
  eventPassthrough: true,
  disablePointer: true,
  disableTouch: false,
  disableMouse: false,
}

const ViewMoreCarousel = ({ heading, items, itemWidth, marginX, ...props }) => {
  return (
    <Container {...props}>
      <h3>{heading}</h3>
      <ReactIScroll iScroll={iScroll} options={I_SCROLL_OPTIONS}>
        <ItemsContainer
          items={items.length}
          itemWidth={itemWidth}
          marginX={marginX}
        >
          {items &&
            items.map(giveaway => {
              return (
                <StyledGiveawayPreviewItem
                  key={giveaway.id}
                  itemWidth={itemWidth}
                  marginX={marginX}
                  {...giveaway}
                />
              )
            })}
        </ItemsContainer>
      </ReactIScroll>
    </Container>
  )
}

export default ViewMoreCarousel
