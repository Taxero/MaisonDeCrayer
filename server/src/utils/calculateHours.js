/**
 * Calculate hours between HH:mm times
 */
exports.calculateHours = (startTime, endTime) => {
  const [startH, startM] = startTime.split(":").map(Number);
  const [endH, endM] = endTime.split(":").map(Number);

  const start = startH + startM / 60;
  const end = endH + endM / 60;

  return end - start;
};
