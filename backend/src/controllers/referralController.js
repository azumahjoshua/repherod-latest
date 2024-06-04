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

module.exports = {
  createReferral,
};
