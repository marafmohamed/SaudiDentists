const express = require("express");
const router = express.Router();
const {
  Login,
  getPaginatedDentists,
} = require("../Controllers/DentistControllers");

router.post("/login", Login);
router.get("/getPaginatedDentists", getPaginatedDentists);
module.exports = router;
