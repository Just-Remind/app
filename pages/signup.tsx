/* eslint-disable consistent-return */
import axios from 'axios';
import { useRouter } from 'next/router';

function Signup() {
  // NEXT ROUTER
  const router = useRouter();

  const handleSignup = (e: any) => {
    e.preventDefault();
    const form = e.target;

    const email = form.querySelector('#email').value;
    const password = form.querySelector('#password').value;
    const repeatPassword = form.querySelector('#repeat-password').value;

    if (password !== repeatPassword) return alert("Passwords don't match");
    axios.post('/api/create_user', {
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
    <form onSubmit={handleSignup}>
      <label htmlFor="email">
        Email
        <input id="email" type="email" />
      </label>
      <label htmlFor="password">
        Password
        <input id="password" type="password" />
      </label>
      <label htmlFor="repeat-password">
        Repeat Password
        <input id="repeat-password" type="password" />
      </label>
      <button type="submit">Sign up</button>
    </form>
  );
}

export default Signup;
