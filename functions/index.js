const admin = require('firebase-admin');
const functions = require('firebase-functions');
const algoliasearch = require('algoliasearch');
const secureCompare = require('secure-compare');

const serviceAccount = require('./service-account.json');
const ALGOLIA_ID = functions.config().algolia.app_id;
const ALGOLIA_ADMIN_KEY = functions.config().algolia.api_key;
const CRON_KEY = functions.config().cron.key;

const ALGOLIA_INDEX_NAME = 'giveaways';
const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://sparkify-30f42.firebaseio.com'
});

// Update the search index every time a giveaway is written.
exports.onGiveawayCreate = functions.firestore.document('giveaways/{giveawayId}').onCreate(event => {
  // Get the giveaway document
  const giveaway = event.data.data();

  // Add an 'objectID' field which Algolia requires
  giveaway.objectID = event.params.giveawayId;

  // Write to the algolia index
  const index = client.initIndex(ALGOLIA_INDEX_NAME);
  return index.saveObject(giveaway);
});

exports.onGiveawayDelete = functions.firestore.document('giveaways/{giveawayId}').onDelete(event => {
  const giveaway = event.data.data();
  const index = client.initIndex(ALGOLIA_INDEX_NAME);

  return index.deleteObject(event.params.giveawayId);
});

exports.giveawayCleanup = functions.https.onRequest((req, res) => {
  const key = req.query.key;

  // Exit if the keys don't match
  if (!secureCompare(key, functions.config().cron.key)) {
    console.log(
      'The key provided in the request does not match the key set in the environment. Check that',
      key,
      'matches the cron.key attribute in `firebase env:get`'
    );
    res
      .status(403)
      .send(
        'Security key does not match. Make sure your "key" URL query parameter matches the ' +
          'cron.key environment variable.'
      );

    return null;
  }

  admin
    .firestore()
    .collection('giveaways')
    .orderBy('endDate')
    .where('endDate', '<', new Date(Date.now()))
    .get()
    .then(snap => {
      const deleteBatch = admin.firestore().batch();
      const moveBatch = admin.firestore().batch();
      snap.forEach(doc => {
        const data = doc.data();
        const id = data.id;

        deleteBatch.delete(doc.ref);

        moveBatch.set(
          admin
            .firestore()
            .collection('expiredGiveaways')
            .doc(id),
          data
        );
      });

      return [deleteBatch.commit(), moveBatch.commit()];
    })
    .then(batches => {
      return Promise.all(batches);
    })
    .then(() => {
      return res.sendStatus(204);
    })
    .catch(error => {
      console.error(error);
    });
});
