const PORT = Number(process.env.PORT) || 3000;

const DATABASE_URL = process.env.DATABASE_URL || "";

const JWT_SECRET = process.env.JWT_SECRET || "";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "";

export const env = {
  port: PORT,
  database: {
    connectionString: DATABASE_URL,
  },
  jwt: {
    secret: JWT_SECRET,
    expiresIn: JWT_EXPIRES_IN,
  }
}