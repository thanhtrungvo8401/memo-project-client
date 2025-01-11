import React from 'react';
import Modal, { ExposeApi as ModalApi } from '../../../components/Modal';

export default function Header() {
  const modalRef = React.useRef<ModalApi>(null);
  return (
    <>
      <div className="flex w-full items-center">
        <span>The memo - Home</span>

        <img
          onClick={() => modalRef.current?.open()}
          className="w-10 h-10 cursor-pointer animate-bounce ml-10"
          src="/donate.png"
          alt="donate"
        />
      </div>

      <Modal ref={modalRef}>
        <div className="relative text-black dark:text-white p-4">
          <h3 className="text-2xl text-center">Buy me a coffee</h3>

          <div className="flex items-center w-full justify-center gap-2">
            <div className="text-center p-4 ">
              <img
                className="w-40 aspect-square"
                src="/momo-code.png"
                alt="momo"
              />
              <h5>Momo</h5>
            </div>

            <div className="text-center">
              <img
                className="w-40 aspect-square"
                src="/bank-code.png"
                alt="momo"
              />
              <h5>Tp Bank</h5>
            </div>
          </div>

          <svg
            className="w-3 h-3 absolute top-4 right-4 cursor-pointer"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
            onClick={() => modalRef.current?.close()}
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
        </div>
      </Modal>
    </>
  );
}
