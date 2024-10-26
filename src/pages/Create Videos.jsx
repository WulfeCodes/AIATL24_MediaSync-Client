import { useState } from 'react';
import { Input, Button, Card, CardBody, ScrollShadow } from "@nextui-org/react";
import { Loader2, RefreshCcw, Trash2, Play } from 'lucide-react';
import axios from 'axios';

const VideoPost = ({ prompt, status, videoUrl, onDelete, timestamp }) => {
  return (
    <Card className="w-full">
      <CardBody>
        <div className="flex justify-between items-start mb-3">
          <div>
            <p className="font-semibold text-lg">{prompt}</p>
            <p className="text-xs text-gray-500">{new Date(timestamp).toLocaleString()}</p>
          </div>
          <Button 
            isIconOnly 
            variant="light" 
            onClick={onDelete}
            className="text-gray-500 hover:text-red-500"
          >
            <Trash2 size={20} />
          </Button>
        </div>
        
        <div className="relative w-full aspect-video bg-gray-100 rounded-lg overflow-hidden">
          {status === 'generating' ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/5 backdrop-blur-[1px]">
              <div className="relative">
                <Loader2 className="w-12 h-12 animate-spin mb-3 text-primary" />
                <Play className="w-6 h-6 text-primary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              </div>
              <p className="text-sm font-medium text-gray-600 mt-4">Generating your video...</p>
              <div className="w-48 h-1 bg-gray-200 rounded-full mt-4 overflow-hidden">
                <div className="h-full bg-primary rounded-full animate-pulse" style={{width: '60%'}}></div>
              </div>
              <p className="text-xs text-gray-500 mt-2">This may take a few minutes</p>
            </div>
          ) : status === 'error' ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-50">
              <p className="text-sm font-medium text-red-500 mb-2">Error generating video</p>
              <Button 
                size="sm" 
                color="primary" 
                variant="flat" 
                className="mt-2"
                startContent={<RefreshCcw size={16} />}
              >
                Retry
              </Button>
            </div>
          ) : (
            <video 
              controls 
              className="w-full h-full"
              src={videoUrl}
            >
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

const CreateVideo = () => {
  const [prompt, setPrompt] = useState("");
  const [videos, setVideos] = useState([]);

  const generateVideo = async () => {
    if (!prompt.trim()) return;

    const newVideo = {
      id: Date.now(),
      prompt: prompt.trim(),
      status: 'generating',
      videoUrl: null,
      timestamp: new Date().toISOString()
    };

    setVideos(prev => [newVideo, ...prev]);
    setPrompt("");

    try {

      const response = await axios.post('http://localhost:3001/api/generate_reel', {
        text: newVideo.prompt,
      });
              
      setVideos(prev => prev.map(video => 
        video.id === newVideo.id 
          ? { ...video, status: 'complete', videoUrl: response.data.errorM }
          : video
      ));
    } catch (error) {
      console.error("Error generating video:", error);
      setVideos(prev => prev.map(video => 
        video.id === newVideo.id 
          ? { ...video, status: 'error' }
          : video
      ));
    }
  };

  const deleteVideo = (videoId) => {
    setVideos(prev => prev.filter(video => video.id !== videoId));
  };

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <Card className="mb-6">
        <CardBody>
          <h1 className="text-2xl font-bold mb-4">Create Video</h1>
          <div className="flex gap-2">
            <Input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              label="Enter your prompt"
              placeholder="Describe the video you want to create..."
              className="flex-1"
            />
            <Button
              color="primary"
              onClick={generateVideo}
              isDisabled={!prompt.trim()}
            >
              Generate
            </Button>
          </div>
        </CardBody>
      </Card>

      <ScrollShadow className="max-h-[800px]">
        {videos.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No videos generated yet. Enter a prompt to get started!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map(video => (
              <VideoPost
                key={video.id}
                prompt={video.prompt}
                status={video.status}
                videoUrl={video.videoUrl}
                timestamp={video.timestamp}
                onDelete={() => deleteVideo(video.id)}
              />
            ))}
          </div>
        )}
      </ScrollShadow>
    </div>
  );
};

export default CreateVideo;