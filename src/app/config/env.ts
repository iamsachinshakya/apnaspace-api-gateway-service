import { z } from "zod";
import { Environment, LogLevel } from "./constants";

// Define & validate environment schema
const envSchema = z.object({
    // Server
    NODE_ENV: z.enum(Environment).default(Environment.DEVELOPMENT),
    PORT: z
        .string()
        .regex(/^\d+$/, { message: "PORT must be a number" })
        .default("5000"),
    CORS_ORIGIN: z.string(),

    // JWT
    ACCESS_TOKEN_SECRET: z.string().min(8, "ACCESS_TOKEN_SECRET must be at least 8 characters"),
    ACCESS_TOKEN_EXPIRY: z.string(),
    REFRESH_TOKEN_SECRET: z.string().min(8, "REFRESH_TOKEN_SECRET must be at least 8 characters"),
    REFRESH_TOKEN_EXPIRY: z.string(),

    // Rate Limiting
    RATE_LIMIT_WINDOW_MS: z.string().regex(/^\d+$/, "RATE_LIMIT_WINDOW_MS must be a number").default("60000"),
    RATE_LIMIT_MAX_REQUESTS: z.string().regex(/^\d+$/, "RATE_LIMIT_MAX_REQUESTS must be a number").default("100"),

    // Downstream Services
    AUTH_SERVICE_BASE_URL: z.string(),
    USER_SERVICE_BASE_URL: z.string(),
    POST_SERVICE_BASE_URL: z.string(),
    COMMENT_SERVICE_BASE_URL: z.string(),

    // Logging
    LOG_LEVEL: z.enum(LogLevel).default(LogLevel.DEBUG),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
    console.error("Invalid environment configuration:");
    console.error(parsed.error.format());
    process.exit(1);
}

export const env = parsed.data;

// constants
export const isProduction = env.NODE_ENV === Environment.PRODUCTION;
export const isDevelopment = env.NODE_ENV === Environment.DEVELOPMENT;
export const isTest = env.NODE_ENV === Environment.TEST;

// Log startup configuration summary
console.info(
    `🌍 Environment initialized: ${env.NODE_ENV} | Port: ${env.PORT} | Log level: ${env.LOG_LEVEL}`
);
