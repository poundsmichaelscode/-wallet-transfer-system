const Wallet = require("../models/Wallet");
const Transaction = require("../models/Transaction");
const mongoose = require("mongoose");

async function transferFunds(senderId, receiverId, amount) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const senderWallet = await Wallet.findOne({ user: senderId }).session(session);
    const receiverWallet = await Wallet.findOne({ user: receiverId }).session(session);

    if (!senderWallet || !receiverWallet) throw new Error("Wallet not found.");
    if (senderWallet.balance < amount) throw new Error("Insufficient balance.");

    senderWallet.balance -= amount;
    receiverWallet.balance += amount;

    await senderWallet.save();
    await receiverWallet.save();

    await Transaction.create([{
      sender: senderId,
      receiver: receiverId,
      amount,
      status: "success"
    }], { session });

    await session.commitTransaction();
    return { message: "Transfer successful" };
  } catch (error) {
    await session.abortTransaction();
    await Transaction.create({
      sender: senderId,
      receiver: receiverId,
      amount,
      status: "failed"
    });
    throw new Error(error.message);
  } finally {
    session.endSession();
  }
}

module.exports = { transferFunds };