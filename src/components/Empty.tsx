export default function Empty(props: { children: React.ReactNode }) {
  return (
    <div className="h-full w-full relative">
      <p className="absolute top-1/2 left-1/2 text-lg -translate-y-full -translate-x-1/2 whitespace-nowrap">
        {props.children}
      </p>
    </div>
  );
}
