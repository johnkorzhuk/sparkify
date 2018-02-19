const functions = require("firebase-functions")
const algoliasearch = require("algoliasearch")
const ALGOLIA_ID = functions.config().algolia.app_id
const ALGOLIA_ADMIN_KEY = functions.config().algolia.api_key

const ALGOLIA_INDEX_NAME = "giveaways"
const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY)

// Update the search index every time a giveaway is written.
exports.onGiveawayCreate = functions.firestore
  .document("giveaways/{giveawayId}")
  .onCreate(event => {
    // Get the giveaway document
    const giveaway = event.data.data()

    // Add an 'objectID' field which Algolia requires
    giveaway.objectID = event.params.giveawayId

    // Write to the algolia index
    const index = client.initIndex(ALGOLIA_INDEX_NAME)
    return index.saveObject(giveaway)
  })
