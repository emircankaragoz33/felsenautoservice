export function getEnv() {
  return {
    DATABASE_URL: process.env.DATABASE_URL ?? "",
    RESEND_API_KEY: process.env.RESEND_API_KEY ?? "",
    RESEND_FROM: process.env.RESEND_FROM ?? "",
    ADMIN_EMAIL: process.env.ADMIN_EMAIL ?? "",
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD ?? "",
    AUTH_SECRET: process.env.AUTH_SECRET ?? "",
    GEMINI_API_KEY: process.env.GEMINI_API_KEY ?? "",
  };
}
