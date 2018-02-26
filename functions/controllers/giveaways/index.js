"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.getGiveaways = undefined;var _extends2 = require("babel-runtime/helpers/extends");var _extends3 = _interopRequireDefault(_extends2);var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}const getGiveaways = exports.getGiveaways = admin => (() => {var _ref = (0, _asyncToGenerator3.default)(function* (req, res) {
    if (!req.body) {
      return res.status(400).json(new Error("Missing request body data"));
    } else if (!req.body.ids) {
      return res.
      status(400).
      json(new Error("Missing ids properly on request body"));
    }
    try {
      let { ids } = req.body;
      if (!Array.isArray(ids)) ids = [ids];

      const ref = admin.firestore().collection("giveaways");
      const removedRef = admin.firestore().collection("removedGiveaways");
      const allSnapshot = yield Promise.all(ids.map(function (id) {return ref.doc(id).get();}));
      let giveaways = [];
      let removed = [];

      allSnapshot.forEach(function (doc) {
        if (!doc.exists) removed.push(doc.id);else
        {
          giveaways.push((0, _extends3.default)({},
          doc.data(), {
            removed: false }));

        }
      });

      if (removed.length > 0) {
        const removedSnapshot = yield Promise.all(
        removed.map(function (id) {return removedRef.doc(id).get();}));

        removedSnapshot.forEach(function (doc) {
          giveaways.push((0, _extends3.default)({},
          doc.data(), {
            removed: true }));

        });
      }

      return res.status(200).json(giveaways);
    } catch (error) {
      console.error(error);
      return res.sendStatus(500);
    }
  });return function (_x, _x2) {return _ref.apply(this, arguments);};})();