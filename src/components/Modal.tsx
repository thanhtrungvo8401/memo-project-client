import React from 'react';
import cl from 'classnames';
import { createPortal } from 'react-dom';
type PropsType = {
  children: React.ReactNode;
};

export type ExposeApi = {
  open: () => void;
  close: () => void;
};
const Modal = React.forwardRef<ExposeApi, PropsType>((props, ref) => {
  const [isOpen, setIsOpen] = React.useState(false);
  React.useImperativeHandle(ref, () => {
    return {
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
    };
  }, []);

  if (!isOpen) return <></>;

  return createPortal(
    <div
      className={cl(
        'overflow-y-auto overflow-x-hidden z-999 fixed top-0 right-0 left-0 justify-center items-center w-full inset-0 max-h-full backdrop-blur-sm bg-white/30 dark:bg-boxdark/30',
      )}
    >
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-1 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-boxdark">
          {props.children}
        </div>
      </div>
    </div>,
    document.body,
  );
});

export default Modal;
