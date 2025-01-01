import React from 'react';
import MoreIcon from './icons/More';
import cl from 'classnames';
import { createPortal } from 'react-dom';
import ClickOutside from './ClickOutside';
type ActionItem = {
  key: string;
  renderer: React.ReactNode;
  onClick?: (key: string) => void;
};

type PropsType = {
  items: Array<ActionItem>;
  className?: string;
  isDarkThemeOnly?: boolean;
};

export default function ActionsListShortcut(props: PropsType) {
  const { className = '', items, isDarkThemeOnly = false } = props;
  const [show, setShow] = React.useState(false);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });

  const renderItems = createPortal(
    <ClickOutside onClick={() => setShow(false)}>
      <div
        className="fixed z-999999 top-1/2 left-1/2 flex gap-2 bg-white dark:bg-boxdark -translate-x-full shadow rounded-sm"
        style={{ top: position.y, left: position.x }}
      >
        {items.map((el) => {
          return (
            <span
              className="p-2"
              key={el.key}
              onClick={(e) => {
                e.stopPropagation();
                el.onClick?.(el.key);
                setShow(false);
              }}
            >
              {el.renderer}
            </span>
          );
        })}
      </div>
    </ClickOutside>,
    document.body,
  );

  return (
    <>
      <span
        onClick={(event: React.MouseEvent<HTMLSpanElement>) => {
          event.stopPropagation();
          setShow((show) => !show);
          const rect = event.currentTarget.getBoundingClientRect();

          setPosition({
            x: rect.right,
            y: rect.top + 36,
          });
        }}
        className={cl(
          'w-8 h-8 min-w-8 flex items-center justify-center cursor-pointer',
          className,
        )}
      >
        <MoreIcon className={cl({ '!text-white': isDarkThemeOnly })} />
      </span>

      {!!show && <span onClick={() => setShow(false)}>{renderItems}</span>}
    </>
  );
}
