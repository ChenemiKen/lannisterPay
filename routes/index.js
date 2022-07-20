const express = require("express")
const Router = express.Router()
const SplitPaymentController = require('../controllers/SplitPaymentController')

Router.post('/split-payments/compute', SplitPaymentController.compute)

module.exports = Router