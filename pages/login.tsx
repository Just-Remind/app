/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';

function Login() {
  // NEXT ROUTER
  const router = useRouter();

  const handleLogin = (e: any) => {
    e.preventDefault();
    const form = e.target;
    const email = form.querySelector('#email').value;
    const password = form.querySelector('#password').value;

    axios.post('/api/login', {
      email,
      password,
    })
      .then((res) => {
        localStorage.setItem('userId', res.data.id);
        router.push('/');
      })
      .catch((err) => alert(err));
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label htmlFor="email">
          Email
          <input id="email" type="email" />
        </label>
        <label htmlFor="password">
          Password
          <input id="password" type="password" />
        </label>
        <button type="submit">Login</button>
        <Link href="/signup">
          <a className="text-sm font-medium">Sign up</a>
        </Link>
      </form>
    </div>
  );
}

export default Login;
