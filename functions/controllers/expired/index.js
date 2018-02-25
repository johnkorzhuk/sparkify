"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.cleanupExpired = undefined;var _extends2 = require("babel-runtime/helpers/extends");var _extends3 = _interopRequireDefault(_extends2);var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}const secureCompare = require("secure-compare");

const cleanupExpired = exports.cleanupExpired = (admin, cronKey) => (() => {var _ref = (0, _asyncToGenerator3.default)(function* (req, res) {
    const { key } = req.query;

    // Exit if the keys don't match
    if (!secureCompare(key, cronKey)) {
      console.log(
      "The key provided in the request does not match the key set in the environment. Check that",
      key,
      "matches the cron.key attribute in `firebase env:get`");

      res.
      status(403).
      send(
      'Security key does not match. Make sure your "key" URL query parameter matches the ' +
      "cron.key environment variable.");


      return null;
    }
    try {
      const snap = yield admin.
      firestore().
      collection("giveaways").
      orderBy("endDate").
      where("endDate", "<", new Date(Date.now())).
      get();

      if (snap.empty) {
        return res.sendStatus(200);
      }

      const deleteBatch = admin.firestore().batch();
      const moveBatch = admin.firestore().batch();

      snap.forEach(function (doc) {
        const data = doc.data();
        const id = data.id;

        deleteBatch.delete(doc.ref);

        moveBatch.set(
        admin.
        firestore().
        collection("removedGiveaways").
        doc(id), (0, _extends3.default)({},

        data, {
          removeMethod: "EXPIRY" }));


      });

      yield Promise.all([deleteBatch.commit(), moveBatch.commit()]);
      return res.sendStatus(204);
    } catch (error) {
      console.error(error);
    }
  });return function (_x, _x2) {return _ref.apply(this, arguments);};})();