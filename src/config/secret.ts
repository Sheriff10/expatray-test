import dotenv from "dotenv";
dotenv.config();

const getEnv = (key: string, fallback?: string) => {
  const value = process.env[key];
  if (!value) {
    if (fallback !== undefined) return fallback;
    throw new Error(`Environment variable ${key} is not set.`);
  }
  return value;
};

const secret = {
  PORT: Number(getEnv("PORT", "3000")),
  MONGO_URI: getEnv("MONGO_URI"),
  JWT_SECRET: getEnv("JWT_SECRET", "jwt_test_secret123%"),
  JWT_EXPIRES_IN: getEnv("JWT_EXPIRES_IN", "1d"),
};

export default secret;
