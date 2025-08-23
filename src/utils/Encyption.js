import bcrypt from "bcrypt";

const SALT_ROUNDS = 10; // jitni zyada value, utna strong hash (par thoda slow bhi hoga)

// Registration: password ko hash karo
export const hashPassword = async (plainPassword) => {
  const hashedPassword = await bcrypt.hash(plainPassword, SALT_ROUNDS);
  return hashedPassword;
};

// Login: entered password aur hashed password compare karo
export const comparePassword = async (plainPassword, hashedPassword) => {
  const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
  return isMatch;
};
