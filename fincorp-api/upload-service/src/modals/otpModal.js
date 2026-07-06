import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["mobile", "email"],
      required: true,
    },
    identifier: {
      type: String, // mobile number or email
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const otpModel = mongoose.model("otpModel", otpSchema);
