import { useDispatch } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Button from '../../components/Button/Button';
import Input from '../../components/input/Input';
import Loader from '../../components/Loader/Loader';
import apiHelper from '../../helpers/apiHelper';
import { setItem } from '../../helpers/localStorage';
import useForm from '../../hooks/useForm';
import Page from '../../layout/Page/Page';
import { addUser } from '../../store/user/action';

import 'react-toastify/dist/ReactToastify.css';
import styles from './login.module.scss';

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogin = async (formData) => {
    const response = await apiHelper('/api/login', formData);

    console.log('🚀 ~ file: index.jsx:25 ~ handleLogin ~ response:', response);

    if (response?.success) {
      dispatch(addUser(response.user));
      setItem('user', response.user);

      const previousPath = window.sessionStorage.getItem('prevPath');

      if (previousPath === '/register' || !previousPath || previousPath === '/login')
        return router.push('/');

      return router.push(previousPath);
    }

    if (!response?.success && response.name === 'notFound') {
      return toast.error('User not found. Create a account first', {
        autoClose: 5000,
        closeOnClick: true,
        draggable: true,
        hideProgressBar: false,
        pauseOnHover: true,
        position: 'bottom-right',
        progress: undefined,
        theme: 'dark',
      });
    }

    return toast.error('Oups, something went wrong, please try again.', {
      autoClose: 5000,
      closeOnClick: true,
      draggable: true,
      hideProgressBar: false,
      pauseOnHover: true,
      position: 'bottom-right',
      progress: undefined,
      theme: 'dark',
    });
  };

  const { handleInputChange, handleSubmit, loading } = useForm(handleLogin);

  return (
    <Page title="Login">
      <form className={styles.form}>
        {loading && <Loader />}
        <h1 className={styles.title}>Login</h1>
        <Input type="email" id="email" label="Email" name="email" onChange={handleInputChange} />
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
};

export default Login;

export async function getServerSideProps(context) {
  const { token } = context.req.cookies;

  if (token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
