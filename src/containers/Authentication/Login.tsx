import React, { ChangeEvent, useContext } from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import useLogin from './hooks/useLogin';
import { AuthenticationContext } from '../contexts';
import Loading from '../../components/Loading';

const Header = (props: { onClose: () => void }) => {
  return (
    <div className="flex items-center justify-between p-4 md:p-5 border-b border-stroke rounded-t dark:border-strokedark">
      <h3 className="text-2xl font-semibold text-black dark:text-white">
        Login
      </h3>

      <button
        type="button"
        onClick={() => props.onClose()}
        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
        data-modal-toggle="crud-modal"
      >
        <svg
          className="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
        <span className="sr-only">Close modal</span>
      </button>
    </div>
  );
};

const LoginForm = (props: {
  closeForm: () => void;
  openSignupForm: () => void;
}) => {
  const { login, isLoading } = useLogin();
  const { saveUserAuthentication } = useContext(AuthenticationContext);
  const [data, setData] = React.useState<{
    username: string;
    password: string;
  }>({
    username: '',
    password: '',
  });
  const [error, setError] = React.useState<{
    username?: string;
    password?: string;
  }>({});

  const onSubmitForm = async (e: any) => {
    e?.preventDefault();
    if (!data.username && !data.password)
      return setError({ username: 'Required', password: 'Required' });
    else if (!data.username) return setError({ username: 'Required' });
    else if (!data.password) return setError({ password: 'Required' });

    const res = await login(data);
    if (res && res._id) {
      saveUserAuthentication({
        username: res.username,
        id: res._id,
      });

      props.closeForm();
    }
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setData({
      ...data,
      [name]: value,
    });

    setError({});
  };

  return (
    <>
      <>
        <Header onClose={props.closeForm} />

        <form
          className="p-4 md:p-5"
          onSubmit={(e) => onSubmitForm(e)}
          action="/"
        >
          <Input
            name="username"
            onChange={handleOnChange}
            label="username"
            error={error.username}
          />

          <Input
            error={error.password}
            name="password"
            onChange={handleOnChange}
            label="password"
            type="password"
          />

          <Button.Primary type="submit">Login</Button.Primary>

          <p className="mt-4">
            Don’t have any account?{' '}
            <span
              className="cursor-pointer text-primary"
              onClick={props.openSignupForm}
            >
              Sign up
            </span>
          </p>

          <Loading active={isLoading} />
        </form>
      </>
    </>
  );
};

export default LoginForm;
