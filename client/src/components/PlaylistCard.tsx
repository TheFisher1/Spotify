import React from 'react';
import { PlayIcon } from 'lucide-react';
import { BlobServiceClient } from '@azure/storage-blob';

// const blobServiceClient = BlobServiceClient.fromConnectionString("<your-connection-string>");
// const containerClient = blobServiceClient.getContainerClient("my-container");
// const blobClient = containerClient.getBlobClient("my-blob.txt");

// const downloadResponse = await blobClient.download(1000, 1000); // offset, count
// const downloaded = await streamToBuffer(downloadResponse.readableStreamBody);

// async function streamToBuffer(readableStream: ReadableStream | undefined) {
//   return new Promise((resolve, reject) => {
//     const chunks = [];
//     readableStream.on("data", (data) => {
//       chunks.push(data instanceof Buffer ? data : Buffer.from(data));
//     });
//     readableStream.on("end", () => {
//       resolve(Buffer.concat(chunks));
//     });
//     readableStream.on("error", reject);
//   });
// }

interface PlaylistProps {
  id: string;
  title: string;
  description: string;
  cover: string;
  setCurrentTrack: (track: any) => void;
  handlePlayPause: () => void;
}
const PlaylistCard: React.FC<PlaylistProps> = ({
  id,
  title,
  description,
  cover,
  setCurrentTrack,
  handlePlayPause
}) => {
  const handlePlay = () => {
    setCurrentTrack({
      id: '1',
      title: 'First Track from ' + title,
      artist: 'Various Artists',
      album: title,
      duration: '3:20',
      cover: cover
    });
    handlePlayPause();
  };
  return <div className="bg-zinc-900 p-4 rounded-lg hover:bg-zinc-800 transition-colors group relative">
    <div className="relative mb-4">
      <img src={cover} alt={title} className="w-full aspect-square object-cover rounded shadow-lg" />
      <button onClick={handlePlay} className="absolute bottom-2 right-2 bg-green-500 rounded-full p-3 shadow-lg opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
        <PlayIcon className="h-6 w-6 text-black" />
      </button>
    </div>
    <h3 className="font-bold truncate">{title}</h3>
    <p className="text-sm text-zinc-400 mt-1 line-clamp-2">{description}</p>
    {/* <iframe width="560" height="315"  */}
    {/* src="https://www.youtube.com/embed/CvBfHwUxHIk?si=b5zHpl_Kynqgina7" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> */}
    {/* <audio controls src='https://spotifyfmi.blob.core.windows.net/songs/Berserk.mp3'></audio> */}
  </div>;
};
export default PlaylistCard;