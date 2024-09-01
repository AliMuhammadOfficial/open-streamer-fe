"use client";

import React, { useCallback, useState } from "react";
import {
  Video,
  Mic,
  Layout,
  Sliders,
  Share2,
  AlertCircle,
  Save,
  Facebook,
  Youtube,
  Instagram,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Twitch from "@/components/icons/Twitch";
import SceneSelector from "@/components/studio/SceneSelector";
import DestinationItem from "@/components/studio/DestinationItem";
import SceneEditor from "@/components/studio/SceneEditor";
import WebRTCStreamPreview from "./WebRTCStreamPreview";
import { sanitizeDeviceId } from "@/lib/securityUtils";
import { handleWebRTCError } from "@/lib/errorUtils";
import { useMediaDevices } from "@/app/hooks/useMediaDevices";
import { Label } from "../ui/label";

export default function CreatePage() {
  const [activeScene, setActiveScene] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [scenes] = useState<{ id: number; name: string }[]>([
    { id: 1, name: "Main" },
    { id: 2, name: "BRB" },
    { id: 3, name: "End" },
  ]);

  const [sources] = useState<ISource[]>([
    { id: 1, name: "Webcam", icon: Video },
    { id: 2, name: "Microphone", icon: Mic },
    { id: 3, name: "Screen Share", icon: Share2 },
    { id: 4, name: "Image", icon: Layout },
    { id: 5, name: "Text", icon: Sliders },
    { id: 6, name: "Browser Source", icon: Layout },
  ]);

  const [sceneSources, setSceneSources] = useState<ISource[]>([]);

  const [destinations, setDestinations] = useState<IDestination[]>([
    { id: 1, name: "Facebook", icon: Facebook },
    { id: 2, name: "YouTube", icon: Youtube },
  ]);

  const addDestination = (newDestination: {
    name: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  }) => {
    setDestinations([...destinations, { id: Date.now(), ...newDestination }]);
  };

  const removeDestination = (id: number) => {
    setDestinations(destinations.filter((dest) => dest.id !== id));
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  const toggleStreaming = () => {
    setIsStreaming(!isStreaming);
  };
  const { devices, cameras, microphones } = useMediaDevices();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <WebRTCStreamPreview />

        <SceneSelector
          scenes={scenes}
          activeScene={activeScene}
          onSceneChange={setActiveScene}
        />

        <Card>
          <CardHeader>
            <CardTitle>Scene Editor</CardTitle>
            <CardDescription>
              Drag and drop sources to build your scene
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SceneEditor
              sources={sources}
              sceneSources={sceneSources}
              setSceneSources={setSceneSources}
            />
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Stream Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="video">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="video">Video</TabsTrigger>
                <TabsTrigger value="audio">Audio</TabsTrigger>
                <TabsTrigger value="output">Output</TabsTrigger>
              </TabsList>
              <TabsContent value="video" className="space-y-4">
                <div>
                  <label className="block mb-2">Camera</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select camera" />
                    </SelectTrigger>
                    <SelectContent>
                      {cameras.map((camera) => (
                        <SelectItem
                          key={camera.deviceId}
                          value={sanitizeDeviceId(camera.deviceId)}
                        >
                          {camera.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block mb-2">Resolution</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select resolution" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1080p">1080p</SelectItem>
                      <SelectItem value="720p">720p</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block mb-2">Frame Rate</label>
                  <Slider defaultValue={[60]} max={60} step={1} />
                </div>
              </TabsContent>
              <TabsContent value="audio" className="space-y-4">
                <div>
                  <label className="block mb-2">Microphone</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select microphone" />
                    </SelectTrigger>
                    <SelectContent>
                      {microphones.map((mic) => (
                        <SelectItem
                          key={mic.deviceId}
                          value={sanitizeDeviceId(mic.deviceId)}
                        >
                          {mic.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block mb-2">Sample Rate</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select sample rate" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="44100">44.1 kHz</SelectItem>
                      <SelectItem value="48000">48 kHz</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block mb-2">Bitrate</label>
                  <Slider defaultValue={[60]} max={60} step={1} />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="echo-cancellation">Echo Cancellation</Label>
                  <Switch id="echo-cancellation" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="noise-suppression">Noise Suppression</Label>
                  <Switch id="noise-suppression" />
                </div>
              </TabsContent>
              <TabsContent value="output" className="space-y-4">
                <div>
                  <label className="block mb-2">Streaming Quality</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select quality" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1080p60">1080p 60fps</SelectItem>
                      <SelectItem value="720p60">720p 60fps</SelectItem>
                      <SelectItem value="720p30">720p 30fps</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block mb-2">Bitrate</label>
                  <Slider defaultValue={[3500]} max={6000} step={500} />
                </div>
                <div className="flex items-center justify-between">
                  <span>Enable VoD</span>
                  <Switch />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Stream Destinations</CardTitle>
          </CardHeader>
          <CardContent>
            {destinations.map((dest: IDestination) => (
              <DestinationItem
                key={dest.id}
                destination={dest}
                onRemove={removeDestination}
              />
            ))}
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full mt-2">Add Destination</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Streaming Destination</DialogTitle>
                  <DialogDescription>
                    Choose a platform to stream to
                  </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { name: "Facebook", icon: Facebook },
                    { name: "YouTube", icon: Youtube },
                    { name: "Twitch", icon: Twitch },
                    { name: "Instagram", icon: Instagram },
                  ].map((platform: any) => (
                    <Button
                      key={platform.name}
                      onClick={() => addDestination(platform)}
                      className="flex flex-col items-center justify-center h-24"
                    >
                      <platform.icon className="h-8 w-8 mb-2" />
                      {platform.name}
                    </Button>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Stream Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block mb-2">Title</label>
              <Input placeholder="Enter stream title" />
            </div>
            <div>
              <label className="block mb-2">Category</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="just-chatting">Just Chatting</SelectItem>
                  <SelectItem value="gaming">Gaming</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block mb-2">Tags</label>
              <Input placeholder="Enter tags" />
            </div>
            <div>
              <label className="block mb-2">Description</label>
              <Input placeholder="Enter stream description" />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-between">
          <Button variant="outline">
            <AlertCircle className="mr-2 h-4 w-4" />
            Test Stream
          </Button>
          <Button>
            <Save className="mr-2 h-4 w-4" />
            Save & Go Live
          </Button>
        </div>
      </div>
    </div>
  );
}
function setSelectedCamera(sanitizedDeviceId: string) {
  throw new Error("Function not implemented.");
}

function setSelectedMicrophone(sanitizedDeviceId: string) {
  throw new Error("Function not implemented.");
}

function updateStream(newConstraints: IMediaStreamOptions) {
  throw new Error("Function not implemented.");
}
