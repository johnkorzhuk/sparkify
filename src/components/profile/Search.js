import React from "react"
import { Input } from "antd"

import { CloseCircle } from "../icons/index"

const GiveawaysList = ({
  setGiveawayFilter,
  resetGiveawayFilter,
  search,
  ...props
}) => {
  return (
    <Input
      {...props}
      suffix={<CloseCircle onClick={resetGiveawayFilter} hasInput={!!search} />}
      placeholder="Filter"
      onChange={e => {
        setGiveawayFilter(e.target.value)
      }}
      value={search}
    />
  )
}

export default GiveawaysList
