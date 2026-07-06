
import { otpModel } from "../modals/otpModal.js";
import { sendEmailOtp } from "../utils/sendEmail.js";
import bcrypt from "bcrypt";

const generateOtp = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

export const sendOtp = async (req, res,next) => {
  try {
    const { type, identifier } = req.body;

    const otp = generateOtp();

    const hashedOtp = await bcrypt.hash(otp, 10);

    await otpModel.deleteMany({
      type,
      identifier,
    });

    await otpModel.create({
      type,
      identifier,
      otp: hashedOtp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    });

    if (type === "email") {
      await sendEmailOtp(identifier, otp);
    }

    if (type === "mobile") {
      // Call SMS API
      console.log(`SMS OTP: ${otp}`);
    }

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error) {
    // next(error)
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const verifyOtp = async (req, res) => {
  try {
    const { type, identifier, otp } = req.body;

    const record = await otpModel.findOne({
      type,
      identifier,
    });

    if (!record) {
      return res.status(400).json({
        success: false,
        message: "OTP not found",
      });
    }

    if (record.expiresAt < new Date()) {
      return res.status(400).json({
        success: false,
        message: "OTP expired",
      });
    }

    const isValid = await bcrypt.compare(
      otp,
      record.otp
    );

    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    record.verified = true;
    await record.save();

    await otpModel.deleteOne({
      _id: record._id,
    });

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};