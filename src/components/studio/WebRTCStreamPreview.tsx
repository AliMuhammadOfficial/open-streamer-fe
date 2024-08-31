import React, { useState, useEffect, useRef } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Pause,
  Disc3,
  Play,
  Camera,
  Mic,
  MicOff,
  VideoOff,
} from "lucide-react";

interface MediaState {
  video: boolean;
  audio: boolean;
}

const WebRTCStreamPreview: React.FC = () => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [mediaState, setMediaState] = useState<MediaState>({
    video: true,
    audio: true,
  });
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  const getMedia = async () => {
    try {
      const newStream = await navigator.mediaDevices.getUserMedia({
        video: mediaState.video,
        audio: mediaState.audio,
      });
      setStream(newStream);
      if (videoRef.current) {
        videoRef.current.srcObject = newStream;
      }
    } catch (err) {
      console.error("Error accessing media devices:", err);
    }
  };

  useEffect(() => {
    if (mediaState.video || mediaState.audio) {
      getMedia();
    } else {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        setStream(null);
      }
    }
  }, [mediaState]);

  const toggleRecording = () => setIsRecording(!isRecording);
  const toggleStreaming = () => setIsStreaming(!isStreaming);

  const toggleVideo = () => {
    setMediaState((prev) => ({ ...prev, video: !prev.video }));
  };

  const toggleAudio = () => {
    setMediaState((prev) => ({ ...prev, audio: !prev.audio }));
  };

  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl">
          WebRTC Stream Preview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="aspect-video bg-black rounded-lg flex items-center justify-center relative mb-4 overflow-hidden">
          {stream ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
          ) : (
            <p className="text-white text-sm sm:text-base">
              No stream available
            </p>
          )}
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          <Button
            size="sm"
            variant={mediaState.video ? "default" : "secondary"}
            onClick={toggleVideo}
          >
            {mediaState.video ? <Camera size={16} /> : <VideoOff size={16} />}
          </Button>
          <Button
            size="sm"
            variant={mediaState.audio ? "default" : "secondary"}
            onClick={toggleAudio}
          >
            {mediaState.audio ? <Mic size={16} /> : <MicOff size={16} />}
          </Button>
        </div>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <Button
            className="w-full sm:w-auto text-xs sm:text-sm"
            size="sm"
            variant={isRecording ? "destructive" : "secondary"}
            onClick={toggleRecording}
            disabled={!stream}
          >
            {isRecording ? (
              <Pause className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
            ) : (
              <Disc3 className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
            )}
            {isRecording ? "Stop Recording" : "Start Recording"}
          </Button>
          <Button
            className="w-full sm:w-auto text-xs sm:text-sm"
            size="sm"
            variant={isStreaming ? "destructive" : "secondary"}
            onClick={toggleStreaming}
            disabled={!stream}
          >
            {isStreaming ? (
              <Pause className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
            ) : (
              <Play className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
            )}
            {isStreaming ? "Stop Streaming" : "Start Streaming"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default WebRTCStreamPreview;
