"use client";

import React, { useState, useEffect, useCallback, useRef, useMemo } from "react";
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
import { useMediaDevices } from "@/app/hooks/useMediaDevices";
import { useMediaStream } from "@/app/hooks/useMediaStream";
import {  toggleTrack } from "@/lib/mediaUtils";

const WebRTCStreamPreview: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [mediaState, setMediaState] = useState({ video: true, audio: true });
  const videoRef = useRef<HTMLVideoElement>(null);

  const { devices, cameras, microphones } = useMediaDevices();
  const [selectedCamera, setSelectedCamera] = useState<string | undefined>(
    undefined
  );
  const [selectedMicrophone, setSelectedMicrophone] = useState<
    string | undefined
  >(undefined);

  const initialConstraints: IMediaStreamOptions = useMemo(() => {
    return {
      video: selectedCamera ? { deviceId: { exact: selectedCamera } } : true,
      audio: selectedMicrophone
        ? { deviceId: { exact: selectedMicrophone } }
        : true,
    };
  }, [selectedCamera, selectedMicrophone]);

  const { stream, error, updateStream } = useMediaStream(initialConstraints);

  useEffect(() => {
    if (cameras.length > 0 && !selectedCamera) {
      setSelectedCamera(cameras[0].deviceId);
    }
    if (microphones.length > 0 && !selectedMicrophone) {
      setSelectedMicrophone(microphones[0].deviceId);
    }
  }, [cameras, microphones, selectedCamera, selectedMicrophone]);

  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  const toggleMedia = useCallback(
    (type: "video" | "audio") => {
      setMediaState((prev) => {
        const newState = { ...prev, [type]: !prev[type] };
        if (stream) {
          toggleTrack(stream, type, newState[type]);
        }
        return newState;
      });
    },
    [stream]
  );

  const toggleRecording = useCallback(() => {
    setIsRecording((prev) => !prev);
  }, []);

  const toggleStreaming = useCallback(() => {
    setIsStreaming((prev) => !prev);
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

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
            onClick={() => toggleMedia("video")}
          >
            {mediaState.video ? <Camera size={16} /> : <VideoOff size={16} />}
          </Button>
          <Button
            size="sm"
            variant={mediaState.audio ? "default" : "secondary"}
            onClick={() => toggleMedia("audio")}
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
