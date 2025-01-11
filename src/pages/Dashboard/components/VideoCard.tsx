export type VideoCardProps = {
  url: string;
  embedUrl: string;
  title: string;
  description?: string;
};

export default function VideoCard(props: VideoCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <iframe
        className="w-full aspect-video rounded-t-lg"
        src={props.embedUrl}
      ></iframe>

      <div className="p-5">
        <a href={props.url} target="_blank">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {props.title}
          </h5>
        </a>

        {!!props.description && (
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {props.description}
          </p>
        )}
      </div>
    </div>
  );
}
