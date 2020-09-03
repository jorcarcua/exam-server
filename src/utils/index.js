const addErrors = (messages, newMessages) => {
  let result = messages;
  if (newMessages && newMessages.lenghth > 0 && messages.length > 0) {
    result = result.push(', ');
  }

  return [...result, ...newMessages];
};

module.exports = {
  addErrors,
};
