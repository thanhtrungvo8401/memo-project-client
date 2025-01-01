import React from 'react';
import Close from './icons/Close';

export default function OverflowingPanel(props: {
  active: boolean;
  children: React.ReactNode;
  onClose: () => void;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    if (props.active) {
      setShow(true);
      setTimeout(() => {
        ref.current?.classList.remove('translate-y-full');
      }, 100);

      return () => {
        ref.current?.classList.add('translate-y-full');
        setTimeout(() => {
          setShow(false);
        }, 500);
      };
    }
  }, [props.active]);

  if (!show) return <></>;

  return (
    <div
      ref={ref as any}
      className="fixed top-0 left-0 h-full w-full bg-white dark:bg-boxdark z-999 translate-y-full transition-transform duration-300 p-4 md:p-6 2xl:p-10"
    >
      <>
        <span
          className="absolute right-4 top-4 md:right-6 md:top-6 2xl:right-10 2xl:top-10 cursor-pointer z-10 rounded-full bg-white dark:bg-boxdark"
          onClick={props.onClose}
        >
          <Close />
        </span>

        {props.children}
      </>
    </div>
  );
}
