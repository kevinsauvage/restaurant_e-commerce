import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import Link from 'next/link';
import Button from '../../components/Button/Button';
import Input from '../../components/input/Input';
import apiHelper from '../../helpers/apiHelper';
import useForm from '../../hooks/useForm';
import Page from '../../layout/Page/Page';
import styles from './register.module.scss';

function Register() {
  const router = useRouter();

  const handleRegister = async (formData) => {
    const res = await apiHelper('/api/register', formData);

    if (res && res.success) return router.push('/login');

    if (res && res.error?.code === 11000)
      return toast.error('Email already registered', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });

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
    <Page title="Register">
      <form className={styles.form}>
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
        pauseOnHover
      />
    </Page>
  );
}

export default Register;
