import { readFileSync } from 'node:fs';
import { sql } from '@vercel/postgres';
import 'dotenv/config';

async function setupData() {
	const schema = readFileSync('./data/schema.sql', 'utf-8');

	await sql.query(schema);

	console.log('database setup complete');
}

setupData();
