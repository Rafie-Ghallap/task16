const express = require('express');
const { reviewProuduct } = require("../controllers/reviewProuductController")

const router = express.Router();
const { checkAuth } = require('../middleware/checkAuth');



router.post("/review/:id",checkAuth,reviewProuduct);



module.exports = router;