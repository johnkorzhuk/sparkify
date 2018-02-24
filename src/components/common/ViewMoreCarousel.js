import React from "react"
import styled from "styled-components"
import ReactIScroll from "react-iscroll"
import iScroll from "iscroll/build/iscroll-lite"

import GiveawayPreviewItem from "../GiveawayPreviewItem"

const Container = styled.div`
  overflow-y: hidden;
`

const ItemsContainer = styled.div`
  display: flex;
  overflow: hidden;
  width: 200vw !important;
  padding: 20px 0;
`

const StyledGiveawayPreviewItem = styled(GiveawayPreviewItem)`
  width: 250px;
  margin: 0 10px;

  &:first-child {
    margin-left: 0;
  }

  &:last-child {
    margin-right: 0;
  }
`

const I_SCROLL_OPTIONS = {
  scrollX: true,
}

const ViewMoreCarousel = ({ heading, items, ...props }) => {
  return (
    <Container {...props}>
      <h3>{heading}</h3>
      <ReactIScroll iScroll={iScroll} options={I_SCROLL_OPTIONS}>
        <ItemsContainer>
          {items &&
            items.map(giveaway => {
              return (
                <StyledGiveawayPreviewItem key={giveaway.id} {...giveaway} />
              )
            })}
        </ItemsContainer>
      </ReactIScroll>
    </Container>
  )
}

export default ViewMoreCarousel
