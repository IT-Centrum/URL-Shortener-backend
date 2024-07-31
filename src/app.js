const express = require("express");
const app = express();
const routes = require("./routes/routes");
const db = require("./db/db");
const { checkForExpiredUrls } = require("../src/scheduled-jobs/scheduler");

const PORT = 3000;
app.use(express.json());
app.use(routes);
setInterval(checkForExpiredUrls, 60000);

db.run()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`The app is listening on PORT ${PORT}`);
    });
  })
  .catch(console.dir);
