import React, { ChangeEvent } from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';

const Header = (props: { onClose: () => void }) => {
  return (
    <div className="flex items-center justify-between p-4 md:p-5 border-b border-stroke rounded-t dark:border-strokedark">
      <h3 className="text-lg font-semibold text-black dark:text-white">
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
  const [error, setError] = React.useState<{ title?: string }>({
    title: undefined,
  });

  const onSubmitForm = (e: any) => {
    e?.preventDefault();
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    // const { name, value } = e.target;

    // setLesson({
    //   ...lesson,
    //   [name]: value,
    // });

    setError({});
  };

  // React.useImperativeHandle(ref, () => {
  //   return {
  //     open: () => {
  //       modalRef.current?.open();
  //     },
  //     close: () => {
  //       modalRef.current?.close();
  //     },
  //   };
  // }, []);

  return (
    <>
      <>
        <Header onClose={props.closeForm} />

        <form
          className="p-4 md:p-5"
          onSubmit={(e) => onSubmitForm(e)}
          action="/"
        >
          <Input name="username" onChange={handleOnChange} label="username" />

          <Input name="password" onChange={handleOnChange} label="password" />

          <Button.Primary onClick={() => {}} type="submit">
            <>
              <svg
                className="me-1 -ms-1 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              Login
            </>
          </Button.Primary>

          <p className="mt-4">
            Don’t have any account?{' '}
            <span
              className="cursor-pointer text-primary"
              onClick={props.openSignupForm}
            >
              Sign up
            </span>
          </p>
        </form>
      </>
    </>
  );
};

export default LoginForm;
