import React from 'react';
import PageTitle from '../../components/PageTitle';
import VideoSources from './components/VideoSource';
import Header from './components/Header';

const Dashboard: React.FC = () => {
  return (
    <>
      <PageTitle title={<Header />} />

      <VideoSources />
    </>
  );
};

export default Dashboard;
