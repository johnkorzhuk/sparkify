import React, { Component } from "react"
import styled from "styled-components"
import ReactIScroll from "react-iscroll"
import iScroll from "iscroll"

import Search from "./Search"
import GiveawayListItem from "./GiveawayListItem"

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  padding-top: 60px;
`

const StyledSearch = styled(Search)`
  position: absolute;
  top: 0;
  width: 100%;
`

const ItemsContainer = styled.div`
  position: relative;
`

const I_SCROLL_OPTIONS = {
  scrollY: true,
  disablePointer: true,
  disableTouch: false,
  disableMouse: false,
  mouseWheel: true,
  scrollbars: true,
}

const GiveawayList = ({
  ownGiveaways,
  setGiveawayFilter,
  resetGiveawayFilter,
  search,
  giveaways,
  type,
}) => {
  return (
    <Container>
      <StyledSearch
        search={search}
        resetGiveawayFilter={resetGiveawayFilter}
        setGiveawayFilter={setGiveawayFilter}
      />

      {giveaways.length > 0 && (
        <ReactIScroll iScroll={iScroll} options={I_SCROLL_OPTIONS}>
          <ItemsContainer>
            {giveaways.map(giveaway => {
              return (
                <GiveawayListItem
                  key={giveaway.id}
                  {...giveaway}
                  ownGiveaways={ownGiveaways}
                  pageType={type}
                />
              )
            })}
          </ItemsContainer>
        </ReactIScroll>
      )}
    </Container>
  )
}

export default GiveawayList
