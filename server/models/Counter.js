import mongoose from "mongoose";

const CounterSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  seq: {
    type: Number,
    required: true,
    default: 0,
  },
});

export default mongoose.model("Counter", CounterSchema);
