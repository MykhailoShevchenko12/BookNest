import Counter from "../models/Counter.js";

const getNextOrderId = async () => {
  const counter = await Counter.findOneAndUpdate(
    { id: "orderId" },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );

  return counter.seq;
};

export default getNextOrderId;
