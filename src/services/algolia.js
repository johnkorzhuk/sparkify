import algoliaSearch from "algoliasearch"

export const ALGOLIA_CLIENT_KEYS = {
  searchKey: "0c877bb4cf9034fda386d38816ab3541",
  appId: "RF7Z503M35",
}

class Algolia {
  constructor({ searchKey, appId, indexes }) {
    const algolia = algoliaSearch(appId, searchKey)

    Object.entries(indexes).forEach(([index, config]) => {
      this[index] = algolia.initIndex(index)
      this[index].searchCacheEnabled = config.cached
    })
  }
}

export default new Algolia({
  ...ALGOLIA_CLIENT_KEYS,
  indexes: {
    giveaways: {
      cached: true,
    },
  },
})
