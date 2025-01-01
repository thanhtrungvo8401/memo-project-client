import cl from 'classnames';

type PropsType = {
  type?: 'submit' | 'button';
  onClick?: () => void;
  children: string | React.ReactNode;
  className?: string;
};

const PrimaryButton = (props: PropsType) => {
  const {
    type = 'button',
    onClick = () => {},
    children,
    className = '',
  } = props;
  return (
    <button
      type={type}
      onClick={onClick}
      className={cl(
        'text-white justify-center flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800',
        className,
      )}
    >
      {children}
    </button>
  );
};

const GradientButton = (props: PropsType) => {
  const {
    type = 'button',
    onClick = () => {},
    children,
    className = '',
  } = props;
  return (
    <button
      type={type}
      onClick={onClick}
      className={cl(
        'text-white flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center',
        className,
      )}
    >
      {children}
    </button>
  );
};

const Button = {
  Primary: PrimaryButton,
  Gradient: GradientButton,
};

export default Button;
