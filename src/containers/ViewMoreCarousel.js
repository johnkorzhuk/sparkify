import React, { Component } from "react"
import { connect } from "react-redux"

import algolia from "../services/algolia"
import { getGiveawaysFromAlgolia } from "../store/giveaways/actions"
import { selectCarouselItems } from "../store/giveaways/selectors"

import ViewMoreCarousel from "../components/common/ViewMoreCarousel"

class ViewMoreCarouselContainer extends Component {
  componentDidMount() {
    const { getGiveawaysFromAlgolia } = this.props
    const query = algolia.giveaways.search({
      query: "canada",
      hitsPerPage: 10,
    })

    getGiveawaysFromAlgolia(query, {
      carousel: true,
    })
  }

  render() {
    return <ViewMoreCarousel {...this.props} />
  }
}

export default connect(
  state => {
    return {
      items: selectCarouselItems(state),
    }
  },
  { getGiveawaysFromAlgolia },
)(ViewMoreCarouselContainer)
