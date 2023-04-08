import { toast, ToastContainer } from 'react-toastify';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Button from '../../components/Button/Button';
import Input from '../../components/input/Input';
import Loader from '../../components/Loader/Loader';
import apiHelper from '../../helpers/apiHelper';
import useForm from '../../hooks/useForm';
import Page from '../../layout/Page/Page';

import 'react-toastify/dist/ReactToastify.css';
import styles from './register.module.scss';

const Register = () => {
  const router = useRouter();

  const handleRegister = async (formData) => {
    try {
      const response = await apiHelper('/api/register', formData);
      if (response?.success) return router.push('/login');
      if (response?.error?.code === 11_000) return toast.error('Email already registered');
      return toast.error(response.message || 'Oops, something went wrong, please try again.');
    } catch (error) {
      console.error(error);
      return toast.error('An error occurred while registering. Please try again.');
    }
  };

  const { handleInputChange, handleSubmit, loading } = useForm(handleRegister);

  return (
    <Page title="Register">
      <form className={styles.form}>
        {loading && <Loader />}
        <h1 className={styles.title}>Register</h1>
        <Input
          type="text"
          id="firstName"
          label="First name"
          name="firstName"
          onChange={handleInputChange}
        />
        <Input
          type="text"
          id="lastName"
          label="Last name"
          name="lastName"
          onChange={handleInputChange}
        />
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
            Already registered ?{' '}
            <Link href="/login">
              <a>Login</a>
            </Link>
          </p>
        </div>
        <Button
          text="REGISTER"
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
        theme="dark"
        pauseOnHover
      />
    </Page>
  );
};

export default Register;

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
