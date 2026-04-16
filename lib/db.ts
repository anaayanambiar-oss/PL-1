import { neon } from "@neondatabase/serverless";

// Single connection — works in serverless/edge environments
const sql = neon(process.env.DATABASE_URL!);

export default sql;
