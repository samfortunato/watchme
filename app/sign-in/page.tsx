import Link from 'next/link';

import { signIn } from '@/lib/auth';

export default function SignIn() {
	async function handleSignIn(formData: FormData) {
		'use server';

		await signIn('credentials', formData);
	}

	return (
		<main>
			<form action={handleSignIn}>
				<label htmlFor="email">Email</label>
				<input type="email" name="email" id="email" />

				<label htmlFor="password">Password</label>
				<input type="password" name="password" id="password" />

				<input type="submit" value="Submit" />
			</form>

			<span>Don't have an account? <Link href="/sign-up/">Sign up</Link></span>
		</main>
	);
}
