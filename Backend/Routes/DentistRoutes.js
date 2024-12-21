const express = require("express");
const router = express.Router();
const {
  Login,
  getPaginatedDentists,
  deleteAccount,
  getDentist,
  getFilteredDentists,
  getDentistWithId,
} = require("../Controllers/DentistControllers");
const { CheckAdminToken, CheckToken } = require("../requireAuth/requireAuth");
router.get("/", CheckToken, getDentist);
router.get("/getDoctor", getFilteredDentists);
router.get("/getPaginatedDentists", CheckAdminToken, getPaginatedDentists);
router.get("/:dentistId", getDentistWithId);
router.post("/login", Login);
router.post("/DeleteAccount", CheckAdminToken, deleteAccount);

module.exports = router;
