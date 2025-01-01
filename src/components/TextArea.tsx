import cl from 'classnames';
import React from 'react';
import Check from './icons/Check';

type PropsType = {
  name: string;
  onChange: (e: any) => void;
  placeHolder?: string;
  type?: string;
  disabled?: boolean;
  error?: string;
  label?: string;
  required?: boolean;
  value?: any;
  rows?: number;
  toggleHidden?: boolean;
};

const TextArea = (props: PropsType) => {
  const {
    name,
    value,
    placeHolder = '',
    onChange,
    disabled = false,
    label,
    error,
    required = false,
    rows = 3,
    toggleHidden = false,
  } = props;

  const [checked, setChecked] = React.useState(!!value);

  return (
    <div>
      {!!label && (
        <label className="mb-3 text-black dark:text-white flex items-center w-full">
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
      <textarea
        onChange={onChange}
        value={value}
        name={name}
        disabled={disabled}
        rows={rows}
        placeholder={placeHolder}
        className={cl(
          `w-full rounded-lg border-[1.5px] bg-transparent py-3 px-5 outline-none transition`,
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
      ></textarea>

      {!!error && (
        <span className="font-medium text-xs text-danger" role="alert">
          {error}
        </span>
      )}
    </div>
  );
};

export default TextArea;
