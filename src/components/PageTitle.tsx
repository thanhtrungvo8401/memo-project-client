const PageTitle = (props: { title: React.ReactNode }) => {
  return (
    <h2 className="mb-6 text-title-md2 font-semibold text-black dark:text-white">
      {props.title}
    </h2>
  );
};

export default PageTitle;
