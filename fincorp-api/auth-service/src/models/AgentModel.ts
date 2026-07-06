import mongoose, { Schema } from "mongoose";
import { IAgent } from "../types/types.js";

const AgentSchema: Schema<IAgent> = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    city: { type: String, required: true },
    experience: { type: String, required: true },
    loanTypes: [{ type: String }],
    aadharNumber: { type: String, required: true },
    panNumber: { type: String, required: true },
    address: { type: String, default: "" },
    password: { type: String, required: true },
    kycStatus: {
      type: String,
      enum: ["not_submitted", "pending", "verified"],
      default: "not_submitted",
    },
    agentId: { type: String, unique: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

AgentSchema.pre("save", async function () {
  if (this.isNew && !this.agentId) {
    const count = await mongoose.model("AgentModel").countDocuments();
    this.agentId = `FIN${String(count + 1).padStart(5, "0")}`;
  }
});

const AgentModel = mongoose.model<IAgent>("AgentModel", AgentSchema);
export default AgentModel;
