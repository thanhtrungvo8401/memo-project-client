import cl from 'classnames';
import React, { ChangeEvent } from 'react';
import Check from './icons/Check';

type PropsType = {
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeHolder?: string;
  type?: string;
  disabled?: boolean;
  error?: string;
  label?: string;
  required?: boolean;
  value?: any;
  toggleHidden?: boolean;
};

const Input = (props: PropsType) => {
  const {
    name,
    value,
    type = 'text',
    placeHolder = '',
    onChange,
    disabled = false,
    label,
    error,
    required = false,
    toggleHidden = false,
  } = props;

  const [checked, setChecked] = React.useState(!!value);

  return (
    <div className="mb-4">
      {!!label && (
        <label
          htmlFor={name}
          className="mb-1 text-black dark:text-white capitalize flex w-full items-center"
        >
          {label}
          {required && <code className="text-danger text-xs">(*)</code>}
          {!required && toggleHidden && (
            <span
              className="inline-block ml-2 cursor-pointer"
              onClick={() => setChecked((c) => !c)}
            >
              <Check
                className={cl({
                  '!text-green-600': checked,
                })}
              />
            </span>
          )}
        </label>
      )}

      <input
        type={type}
        name={name}
        id="name"
        className={cl(
          'w-full rounded-lg border-[1.5px] bg-transparent py-2 md:py-3 px-4 md:px-5  outline-none transition',
          {
            ' dark:bg-form-input text-black dark:text-white': !disabled,
          },
          {
            'focus:border-primary border-stroke dark:border-form-strokedark ':
              !disabled && !error,
          },
          {
            'bg-whiter opacity-80': disabled,
          },
          {
            'border-danger': !!error && !disabled,
          },
          {
            hidden: toggleHidden && !checked,
          },
        )}
        placeholder={placeHolder}
        onChange={onChange}
        disabled={disabled}
        value={value}
        autoComplete="off"
      />

      {!!error && (
        <span className="font-medium text-xs text-danger" role="alert">
          {error}
        </span>
      )}
    </div>
  );
};

export default Input;
