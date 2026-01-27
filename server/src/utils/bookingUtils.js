const crypto = require("crypto");

exports.generateBookingReference = () => {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const rand = crypto.randomBytes(3).toString("hex").toUpperCase();
  return `HOTEL-${date}-${rand}`;
};

exports.generateOtp = () => {
  return crypto.randomInt(100000, 999999).toString();
};


exports.hashOtp = (otp) => {
  return crypto.createHash("sha256").update(otp).digest("hex");
};