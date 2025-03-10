import * as dotenv from 'dotenv';
import * as path from "node:path";

// Load environment variables from .env file. This is not the best but need to do this here
// because of the stupid way NestJS works with dependency injection. if we don't do this up front
// then the ConfigService will not be able to load the environment variables from the .env file prior to initializing the
// auth module.  In production, we would be fine because the environment variables would be set in the environment not a .env file.
dotenv.config({ path: path.resolve(__dirname, '../.env') });

export default () => ({
    port: (process?.env?.PORT) ? parseInt(process.env.PORT, 10) : 3001,
    jwt_secret: process?.env?.JWT_SECRET,
    jwt_expires: process?.env?.JWT_EXPIRES ||'90d',
    database: {
        host: process?.env?.DATABASE_HOST,
        port: (process?.env?.DATABASE_PORT) ? parseInt(process.env.DATABASE_PORT, 10) : 5432
    }
});
