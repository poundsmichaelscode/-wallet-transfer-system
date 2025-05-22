const { transferFunds } = require("../services/walletService");

exports.handleTransfer = async (req, res) => {
  const { senderId, receiverId, amount } = req.body;
  try {
    const result = await transferFunds(senderId, receiverId, amount);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};