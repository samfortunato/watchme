import { signUp } from './actions';

export default function SignUp() {
	return (
		<form action={signUp}>
			<label htmlFor="email">Email</label>
			<input type="email" name="email" id="email" />

			<label htmlFor="password">Password</label>
			<input type="password" name="password" id="password" />

			<input type="submit" value="Sign Up" />
		</form>
	);
}
