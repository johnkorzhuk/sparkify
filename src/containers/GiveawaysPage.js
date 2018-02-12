import React, { Component } from "react"

import GiveawaysPage from "../components/pages/Giveaways"

class GiveawaysPageContainer extends Component {
  render() {
    return <GiveawaysPage giveaways={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} />
  }
}

export default GiveawaysPageContainer
