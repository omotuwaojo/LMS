const { Router } = require("express");
const healthcheck = require("../controllers/healthcheckController.js")

const router = Router()

router.route("/healthcheck").get(healthcheck)

module.exports = router;
