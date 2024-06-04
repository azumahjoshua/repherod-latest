const express = require('express');
const roleRoute = require("./roleRoute");
const userRoute = require("./userRoute");
const hospitalRoute = require("./hospitalRoute")
const referralRoute = require("./referralRoute")

const router = express.Router();

// Routes for Role-related endpoints
router.use('/role', roleRoute);

// Routes for User-related endpoints
router.use("/user", userRoute);

// Routes for Hospital-related endpoints 
router.use("/hospital",hospitalRoute)

// Routes for Referral-related endpoints
router.use("/referral",referralRoute)
// Error handling middleware
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

module.exports = router;