import mongoose from "mongoose";

interface IMessage extends mongoose.Document {
  firstname: string;
  lastname: string;
  email: string;
  message: string;
}

const message = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const Message = mongoose.model<IMessage>("Message", message);

export default Message;
