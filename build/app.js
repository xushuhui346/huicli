"use strict";

var _koa = require("koa");

var _koa2 = _interopRequireDefault(_koa);

var _config = require("./config");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = new _koa2.default();
app.use(async ctx => {
  ctx.body = 'Hello World';
});
app.listen(_config2.default.port, () => {
  console.log(`huicli listening on ${_config2.default.port}`);
});