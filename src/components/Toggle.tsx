export default function Toggle(props: {
  className?: string;
  label?: string;
  subLabel?: string;
  check: boolean;
  onToggle: (status: boolean) => void;
}) {
  return (
    <>
      <label className="inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          value=""
          className="sr-only peer"
          checked={props.check}
          disabled
        />
        {!!props.subLabel && (
          <span className="me-3 text-sm font-medium text-gray-500 dark:text-gray-400">
            {props.subLabel}
          </span>
        )}

        <div
          onClick={() => props.onToggle(props.check)}
          className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
        ></div>

        {!!props.label && (
          <span className="ms-3 text-sm font-medium text-gray-500 dark:text-gray-400">
            {props.label}
          </span>
        )}
      </label>
    </>
  );
}
