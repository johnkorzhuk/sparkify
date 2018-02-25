"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.deleteCollection = undefined;var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);let deleteQueryBatch = (() => {var _ref = (0, _asyncToGenerator3.default)(








  function* (db, query, batchSize, resolve, reject) {
    try {
      const snapshot = yield query.get();
      // When there are no documents left, we are done
      if (snapshot.size == 0) {
        return 0;
      }
      // Delete documents in a batch
      const batch = db.batch();
      snapshot.docs.forEach(function (doc) {
        batch.delete(doc.ref);
      });

      yield batch.commit();

      if (snapshot.size === 0) {
        return resolve();
      }

      // Recurse on the next process tick, to avoid
      // exploding the stack.
      process.nextTick(function () {
        deleteQueryBatch(db, query, batchSize, resolve, reject);
      });
    } catch (error) {
      reject(error);
    }
  });return function deleteQueryBatch(_x, _x2, _x3, _x4, _x5) {return _ref.apply(this, arguments);};})();function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}const deleteCollection = exports.deleteCollection = (db, collectionPath, batchSize) => {const collectionRef = db.collection(collectionPath);const query = collectionRef.orderBy("__name__").limit(batchSize);return new Promise((resolve, reject) => {deleteQueryBatch(db, query, batchSize, resolve, reject);});};