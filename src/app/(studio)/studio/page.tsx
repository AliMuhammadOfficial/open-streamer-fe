"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Video, Mic } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function StreamPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card rounded-lg shadow-lg overflow-hidden">
          <div className="aspect-video bg-muted flex items-center justify-center">
            <Video className="h-16 w-16 text-primary opacity-20" />
          </div>
          <div className="p-4">
            <Input placeholder="Stream Title" className="mb-4" />
            <Tabs defaultValue="video">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="video">Video</TabsTrigger>
                <TabsTrigger value="audio">Audio</TabsTrigger>
              </TabsList>
              <TabsContent value="video" className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                  <label className="mb-2 sm:mb-0">Camera</label>
                  <Select>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Built-in Camera" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="built-in">Built-in Camera</SelectItem>
                      <SelectItem value="external">External Camera</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label>Brightness</label>
                  <Slider defaultValue={[50]} max={100} step={1} />
                </div>
              </TabsContent>
              <TabsContent value="audio" className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                  <label className="mb-2 sm:mb-0">Microphone</label>
                  <Select>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Built-in Microphone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="built-in">
                        Built-in Microphone
                      </SelectItem>
                      <SelectItem value="external">
                        External Microphone
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label>Volume</label>
                  <Slider defaultValue={[75]} max={100} step={1} />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-card rounded-lg shadow-lg p-4">
            <h3 className="text-lg font-semibold mb-4">Stream Info</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Viewers</span>
                <span className="font-bold">1,234</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Duration</span>
                <span className="font-bold">02:45:30</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Quality</span>
                <span className="font-bold">1080p60</span>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-lg shadow-lg p-4">
            <h3 className="text-lg font-semibold mb-4">Quick Settings</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Low Latency Mode</span>
                <Switch />
              </div>
              <div className="flex justify-between items-center">
                <span>Chat Only Mode</span>
                <Switch />
              </div>
              <div className="flex justify-between items-center">
                <span>Subscriber Only Chat</span>
                <Switch />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
