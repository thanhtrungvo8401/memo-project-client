import LogoIcon from './icons/Logo';
import cl from 'classnames';
export default function Logo(props: { className?: string }) {
  return (
    <div className="w-8 h-8 overflow-hidden">
      <LogoIcon
        className={cl(
          'scale-50 text-[#3b4fe0] dark:text-white -translate-x-4 -translate-y-4',
          props.className ?? '',
        )}
      />
    </div>
  );
}
