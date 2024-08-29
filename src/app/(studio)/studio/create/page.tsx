"use client";

import React, { useState } from "react";
import {
  Video,
  Mic,
  Layout,
  Sliders,
  Share2,
  AlertCircle,
  Save,
  Trash2,
  Pause,
  Play,
  Facebook,
  Youtube,
  Instagram,
  Disc3,
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

export default function StudioCreatePage() {
  const [activeScene, setActiveScene] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [scenes] = useState([
    { id: 1, name: "Main" },
    { id: 2, name: "BRB" },
    { id: 3, name: "End" },
  ]);

  const [sources] = useState([
    { id: 1, name: "Webcam", icon: Video, example: "Logitech C920" },
    { id: 2, name: "Microphone", icon: Mic, example: "Blue Yeti" },
    { id: 3, name: "Screen Share", icon: Share2, example: "Primary Monitor" },
    { id: 4, name: "Image", icon: Layout, example: "logo.png" },
    { id: 5, name: "Text", icon: Sliders, example: "Stream Starting Soon" },
    { id: 6, name: "Browser Source", icon: Layout, example: "Twitch Chat" },
  ]);

  const [sceneSources, setSceneSources] = useState([]);

  const [destinations, setDestinations] = useState([
    { id: 1, name: "Twitch", icon: Twitch },
  ]);

  const addDestination = (newDestination: {
    name: string;
    icon: React.ComponentType;
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

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Create New Stream</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Stream Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-black rounded-lg flex items-center justify-center relative">
                <p className="text-white">Stream Preview</p>
                <div className="absolute top-2 right-2 flex space-x-2">
                  <Button
                    size="sm"
                    variant={isRecording ? "destructive" : "secondary"}
                    onClick={toggleRecording}
                  >
                    {isRecording ? (
                      <Pause className="mr-2 h-4 w-4" />
                    ) : (
                      <Disc3 className="mr-2 h-4 w-4" />
                    )}
                    {isRecording ? "Stop Recording" : "Start Recording"}
                  </Button>
                  <Button
                    size="sm"
                    variant={isStreaming ? "destructive" : "secondary"}
                    onClick={toggleStreaming}
                  >
                    {isStreaming ? (
                      <Pause className="mr-2 h-4 w-4" />
                    ) : (
                      <Play className="mr-2 h-4 w-4" />
                    )}
                    {isStreaming ? "Stop Streaming" : "Start Streaming"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

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
              {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Available Sources</h4>
                  {sources.map((source) => (
                    <Accordion type="single" collapsible key={source.id}>
                      <AccordionItem value={`source-${source.id}`}>
                        <AccordionTrigger>
                          <SourceItem source={source} />
                        </AccordionTrigger>
                        <AccordionContent>
                          Example: {source.example}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  ))}
                </div>
                <div className="bg-secondary p-4 rounded-lg min-h-[200px]">
                  <h4 className="font-semibold mb-2">Current Scene</h4>
                  <p className="text-muted-foreground">Drag sources here</p>
                </div>
              </div> */}
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
                {/* ... (previous video and audio TabsContent remain the same) */}
                <TabsContent value="video" className="space-y-4">
                  <div>
                    <label className="block mb-2">Camera</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select camera" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="webcam">Webcam</SelectItem>
                        <SelectItem value="dslr">DSLR</SelectItem>
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
                <TabsContent value="video" className="space-y-4">
                  <div>
                    <label className="block mb-2">Camera</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select camera" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="webcam">Webcam</SelectItem>
                        <SelectItem value="dslr">DSLR</SelectItem>
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
              {destinations.map((dest) => (
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
                    ].map((platform) => (
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
              {/* ... (previous Stream Info content remains the same) */}
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
    </div>
  );
}
