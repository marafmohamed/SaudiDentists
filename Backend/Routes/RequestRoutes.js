const express = require("express");
const router = express.Router();

const {
  createDentistRequest,
  AcceptRequest,
  RefuseRequest,
  getPaginatedRequests,
} = require("../Controllers/RequestControllers");

const { CheckAdminToken, CheckToken } = require("../requireAuth/requireAuth");

router.post("/createDentistRequest", createDentistRequest);
router.post("/AcceptRequest", CheckAdminToken, AcceptRequest);
router.post("/RefuseRequest", CheckAdminToken, RefuseRequest);
router.get("/getPaginatedRequests", CheckAdminToken, getPaginatedRequests);

module.exports = router;
