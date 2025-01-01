import React from 'react';
import PageTitle from '../../components/PageTitle';

const Dashboard: React.FC = () => {
  return (
    <>
      <PageTitle title="Dashboard" />

      <iframe
        className="w-full aspect-video"
        src="https://www.youtube.com/embed/axYAW7PuSIM"
      ></iframe>

      <a
        href="https://react-demo.tailadmin.com/"
        target='_blank'
        className="my-4 block font-medium text-blue-600 dark:text-blue-500 hover:underline"
      >
        Layout documentation
      </a>

      <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Start now</button>

    </>
  );
};

export default Dashboard;
