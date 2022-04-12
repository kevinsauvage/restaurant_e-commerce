/* eslint-disable jsx-a11y/anchor-is-valid */
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import Link from 'next/link';
import Button from '../../components/Button/Button';
import Input from '../../components/input/Input';
import useForm from '../../hooks/useForm';
import Page from '../../layout/Page/Page';
import styles from './login.module.scss';
import 'react-toastify/dist/ReactToastify.css';
import apiHelper from '../../helpers/apiHelper';

function Login() {
  const router = useRouter();

  const handleRegister = async (formData) => {
    const res = await apiHelper('/api/login', formData);

    if (res && res.succes) return router.push('/');

    return toast.error('Oups, something went wrong, please try again.', {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });
  };

  const { handleInputChange, handleSubmit } = useForm(handleRegister);

  return (
    <Page>
      <form className={styles.form}>
        <h1 className={styles.title}>Login</h1>

        <Input
          type="email"
          id="email"
          label="Email"
          name="email"
          onChange={handleInputChange}
        />
        <Input
          type="password"
          id="password"
          label="Password"
          name="password"
          onChange={handleInputChange}
        />
        <div className={styles.login}>
          <p>
            Not registered yet ?{' '}
            <Link href="/register">
              <a>Register</a>
            </Link>
          </p>
        </div>

        <Button
          text="LOGIN"
          onClick={handleSubmit}
          style={styles.btn}
          onChange={handleInputChange}
        />
      </form>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Page>
  );
}

export default Login;
