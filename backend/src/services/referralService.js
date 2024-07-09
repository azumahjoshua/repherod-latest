const { Patient, Referral, sequelize } = require("../../models");
const { uploadFileToS3 } = require("../util/s3Service");
const { Op } = require('sequelize');

const createReferral = async ({ referralData, patientData, files }) => {
  let transaction;
  try {
    transaction = await sequelize.transaction();

    const [patient, created] = await Patient.findOrCreate({
      where: {
        firstName: patientData.firstName,
        lastName: patientData.lastName,
        dateOfBirth: patientData.dateOfBirth,
      },
      defaults: patientData,
      transaction,
    });

    const newReferralData = {
      ...referralData,
      patientId: patient.id,
      // refDocs: files.map(file => `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${file.filename}`),
    };

    if (files && files.length > 0) {
      const fileUrls = [];
      for (const file of files) {
        const filePath = file.path;
        const fileName = file.filename;
        await uploadFileToS3(filePath, fileName);
        fileUrls.push(
          `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${fileName}`
        );
      }
      newReferralData.refDocs = fileUrls;
      // newReferralData.refDoc = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${fileName}`;
    }

    const newReferral = await Referral.create(newReferralData, { transaction });

    await transaction.commit();
    return { referral: newReferral, patient };
  } catch (error) {
    if (transaction) await transaction.rollback();
    throw new Error("Error creating referral: " + error.message);
  }
};
const getReferralsByUser = async ({ userId }) => {
  return Referral.findAll({ where: { userId }, include: [Patient] });
};
const getReferralsByOther = async ({ userId }) => {
  try {
    const referral = Referral.findAll({
      where: {
       userId:{
         [Op.ne]: userId,
       } 
      },
      order: [["createdAt", "DESC"]],
      include: [Patient],
    });
    return referral;
  } catch (error) {
    console.error("Error fetching referrals:", error);
    throw new Error("Failed to fetch referrals");
  }
};
const getReferralsByStatus = async({status})=>{
  try {
    const referral = await Referral.findAll({where :{ status:status}});
    return referral;
  } catch (error) {
    console.error("Error fetching referrals:", error);
    throw new Error("Failed to fetch referrals");
  }
}
module.exports = {
  createReferral,
  getReferralsByUser,
  getReferralsByOther,
  getReferralsByStatus
};
