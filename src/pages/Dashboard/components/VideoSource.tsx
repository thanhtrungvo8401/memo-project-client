import VideoCard, { VideoCardProps } from './VideoCard';

export default function VideoSources() {
  const videoSources: Array<VideoCardProps> = [
    {
      url: 'https://www.youtube.com/watch?v=uHqWebmwi_A',
      embedUrl: 'https://www.youtube.com/embed/uHqWebmwi_A',
      title: 'Cách Tăng Động Lực Học Tiếng Anh',
      description:
        'Nếu bạn muốn học tiếng Anh nhưng thường thiếu động lực thì podcast này là dành cho bạn.',
    },
    {
      url: 'https://www.youtube.com/watch?v=5WjFQieCwBM',
      embedUrl: 'https://www.youtube.com/embed/5WjFQieCwBM',
      title:
        'How To Think and Speak in English? |🎧 Podcast and Chill | Beginner',
      description: '',
    },
    {
      url: 'https://www.youtube.com/watch?v=QoKpQMJnBHY',
      embedUrl: 'https://www.youtube.com/embed/QoKpQMJnBHY',
      title:
        'Learn English With Podcast Conversation Episode 1 | English Podcast For Beginners',
      description: '',
    },
    {
      url: 'https://www.youtube.com/watch?v=9a9qNLUpkV8',
      embedUrl: 'https://www.youtube.com/embed/9a9qNLUpkV8',
      title: 'Jack and the Beanstalk',
      description: '',
    },
  ];
  return (
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {videoSources.map((el, index) => {
        return (
          <VideoCard
            key={index + el.url}
            embedUrl={el.embedUrl}
            url={el.url}
            title={el.title}
            description={el.description}
          />
        );
      })}
    </div>
  );
}
