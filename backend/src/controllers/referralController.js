const referralService = require("../services/referralService");

const createReferral = async (req, res) => {
  try {
    const { referralData, patientData } = req.body;
    let parsedReferralData, parsedPatientData;
    try {
      parsedReferralData = JSON.parse(referralData);
      parsedPatientData = JSON.parse(patientData);
    } catch (error) {
      throw new Error("Invalid JSON data.");
    }
    const files = req.files;

    const newReferral = await referralService.createReferral({
      referralData: parsedReferralData,
      patientData: parsedPatientData,
      files,
    });

    res.status(201).json(newReferral);
  } catch (error) {
    console.error("Error creating referral:", error.message);
    res.status(500).json({ error: "Failed to create referral." });
  }
};
const getReferralsByUser = async(req,res)=>{
  try {
    const {userId } = req.params
    const referrals = await referralService.getReferralsByUser({userId})
    res.status(200).json(referrals)
  } catch (error) {
    console.error("Error fetching referrals:", error.message);
    res.status(500).json({ error: "Failed to fetch referrals." });
  }
}
const getReferralsByOther = async(req,res)=>{
  try {
    const {userId} = req.params;
    const referrals = await referralService.getReferralsByOther({userId});
    res.status(200).json(referrals)
  } catch (error) {
    console.error("Error fetching referrals:", error.message);
    res.status(500).json({ error: "Failed to fetch referrals." });
  }
}
const getReferralsByStatus = async(req,res)=>{
  try {
    console.log(req.params.status);
    const status = req.params.status;
    const referrals = referralService.getReferralsByStatus({status})
    res.status(200).json(referrals)
  } catch (error) {
    console.error("Error fetching referrals:", error.message);
    res.status(500).json({ error: "Failed to fetch referrals." });
  }
}
module.exports = {
  createReferral,
  getReferralsByUser,
  getReferralsByOther,
  getReferralsByStatus
};
