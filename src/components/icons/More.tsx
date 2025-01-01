import cl from 'classnames';

export default function MoreIcon(props: { className?: string }) {
  return (
    <svg
      className={cl('w-6 h-6 text-black dark:text-white', props.className)}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="3"
        d="M12 6h.01M12 12h.01M12 18h.01"
      />
    </svg>
  );
}
