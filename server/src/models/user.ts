import mongoose from "mongoose";

interface ICommodity extends mongoose.Document {
  title: string;
  type: string;
  amount: number;
  change: number;
  date: string;
  increase: boolean;
}

interface IUser extends mongoose.Document {
  email: string;
  firstname: string;
  lastname: string;
  total: number;
  silver: number;
  gold: number;
  platinum: number;
  palladium: number;
  commodities: ICommodity[];
}

const user = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  total: {
    type: Number,
    default: 0,
  },
  silver: {
    type: Number,
    default: 0,
  },
  gold: {
    type: Number,
    default: 0,
  },
  platinum: {
    type: Number,
    default: 0,
  },
  palladium: {
    type: Number,
    default: 0,
  },
  commodities: [
    {
      title: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        enum: ["silver", "gold", "platinum", "palladium"],
        reuired: true,
      },
      amount: {
        type: Number,
        required: true,
      },
      change: {
        type: Number,
        required: true,
      },
      date: {
        type: String,
        required: true,
      },
      increase: {
        type: String,
        required: true,
      },
    },
  ],
});

const User = mongoose.model<IUser>("User", user);
export default User;
