import React from 'react';
import Modal from '../../components/Modal';
import LoginForm from './Login';
import SignupForm from './Signup';

export type ExposeApi = {
  openLoginForm: () => void;
  openSignupForm: () => void;
  close: () => void;
};

const Authentication = React.forwardRef<ExposeApi, {}>((_, ref) => {
  const [formType, setFormType] = React.useState<'login' | 'sign-up' | null>(
    null,
  );

  const modalRef = React.useRef<any>();

  React.useEffect(() => {
    switch (formType) {
      case null:
        modalRef.current?.close();
        break;

      case 'login':
      case 'sign-up':
        modalRef.current?.open();
        break;

      default:
        break;
    }
  }, [formType]);

  React.useImperativeHandle(
    ref,
    () => {
      return {
        close() {
          setFormType(null);
        },
        openLoginForm() {
          setFormType('login');
        },
        openSignupForm() {
          setFormType('sign-up');
        },
      };
    },
    [],
  );

  return (
    <Modal ref={modalRef}>
      {formType === 'login' && (
        <LoginForm
          closeForm={() => setFormType(null)}
          openSignupForm={() => setFormType('sign-up')}
        />
      )}
      {formType === 'sign-up' && (
        <SignupForm
          closeForm={() => setFormType(null)}
          openLoginForm={() => setFormType('login')}
        />
      )}
    </Modal>
  );
});

export default Authentication;
