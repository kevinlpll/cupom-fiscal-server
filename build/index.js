"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _routes = require('./routes');
const cors = require("cors")
const SERVER_PORT = 3333
const app = _express2.default.call(void 0, )

app.use(cors())
app.use(_express2.default.json())

app.use(_routes.routes)

app.listen(SERVER_PORT,() => {
  console.log(`Server is running on port ${SERVER_PORT}`)
})

