import mongoose, { mongo } from "mongoose";

interface IPrice extends mongoose.Document {
  gold: number;
  silver: number;
  platinum: number;
  palladium: number;
  goldChange: number;
  silverChange: number;
  platinumChange: number;
  palladiumChange: number;
}

const priceSchema = new mongoose.Schema({
  gold: {
    type: Number,
    required: true,
  },
  goldChange: Number,
  silver: {
    type: Number,
    required: true,
  },
  silverChange: Number,
  platinum: {
    type: Number,
    required: true,
  },
  platinumChange: Number,
  palladium: {
    type: Number,
    required: true,
  },
  palladiumChange: Number,
});

const Prices = mongoose.model<IPrice>("Prices", priceSchema);

export default Prices;
