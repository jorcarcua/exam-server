const simulateDelay = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

module.exports = {
  simulateDelay,
};
