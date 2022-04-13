const bcrypt = require('bcrypt');

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

export const comparePassword = async (password, hash) => {
  const isSame = await bcrypt.compare(password, hash);
  return isSame;
};
