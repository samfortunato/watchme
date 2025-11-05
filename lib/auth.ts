import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { sql } from '@vercel/postgres';
import bcrypt from 'bcrypt';

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [
		Credentials({
			credentials: {
				email: {},
				password: {},
			},

			async authorize(credentials) {
				const { rows: [user] } = await sql`
					select *
					from users
					where email = ${credentials.email};
				`;

				const doPasswordsMatch = await bcrypt.compare(
					credentials.password as string,
					user.password_digest,
				);

				if (user && doPasswordsMatch) {
					return {
						id: user.id.toString(),
						email: user.email,
					};
				}

				return null;
			},
		}),
	],
});
