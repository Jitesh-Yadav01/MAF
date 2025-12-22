require('dotenv').config();
const { z } = require('zod');

const configSchema = z.object({
    PORT: z.coerce.number().default(3000),
    DASHBOARD_PORT: z.coerce.number().default(3001),
    MAF_MODE: z.enum(['MONITOR', 'BLOCK', 'DROP']).default('MONITOR'),
    MAF_AI_ENABLED: z.string().transform((val) => val === 'true').default('false'),
    MAF_AI_PROVIDER: z.string().default('openrouter'),
    MAF_AI_API_KEY: z.string().optional(),
    REDIS_URL: z.string().default('redis://localhost:6379'),
    MONGO_URL: z.string().default('mongodb://localhost:27017/maf'),
    RISK_THRESHOLD_BLOCK: z.coerce.number().default(80),
    RISK_THRESHOLD_DROP: z.coerce.number().default(95),
});

const config = configSchema.safeParse(process.env);

if (!config.success) {
    console.error('❌ Invalid configuration:', config.error.format());
    process.exit(1);
}

const validatedConfig = config.data;

if (validatedConfig.MAF_AI_ENABLED && !validatedConfig.MAF_AI_API_KEY) {
    console.warn('⚠️  AI is enabled but no API key provided. AI features may fail.');
}

module.exports = validatedConfig;
