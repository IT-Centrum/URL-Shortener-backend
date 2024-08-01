const express = require("express");
const app = express();
const routes = require("./routes/routes");
const db = require("./db/db");
const { checkForExpiredUrls } = require("../src/scheduled-jobs/scheduler");
const errorHandler = require("./middlewares/ErrorMiddleware");
require("dotenv").config();

const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(routes);
setInterval(checkForExpiredUrls, 60000);
app.use(errorHandler);
db.run()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`The app is listening on PORT ${PORT}`);
    });
  })
  .catch(console.dir);
