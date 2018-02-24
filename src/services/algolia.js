import algoliaSearch from "algoliasearch"

export const ALGOLIA_CLIENT_KEYS = {
  searchKey: "0c877bb4cf9034fda386d38816ab3541",
  appId: "RF7Z503M35",
}

class Algolia {
  constructor({ searchKey, appId, indices }) {
    this._algolia = algoliaSearch(appId, searchKey)

    this._configure(indices)
  }

  _configure(indices) {
    Object.entries(indices).forEach(([index, { searchCacheEnabled }]) => {
      this[index] = this._algolia.initIndex(index)
      this[index].searchCacheEnabled = searchCacheEnabled || false

      // if (setSettings) {
      //   const { searchableAttributes } = setSettings

      //   if (searchableAttributes) {
      //     this[index].setSettings({
      //       searchableAttributes,
      //     })
      //   }
      // }
    })
  }
}

export default new Algolia({
  ...ALGOLIA_CLIENT_KEYS,
  indices: {
    giveaways: {
      searchCacheEnabled: true,
    },
  },
})
