'use server';

import { redirect } from 'next/navigation';
import { sql } from '@vercel/postgres';
import bcrypt from 'bcrypt';

export async function signUp(formData: FormData) {
	const email = formData.get('email') as string;
	const password = formData.get('password') as string;

	const digested = await bcrypt.hash(password, 10);

	await sql`
		insert into users (email, password_digest)
		values (${email}, ${digested});
	`;

	redirect('/sign-in');
}
