"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Mic,
  Video,
  Settings,
  Users,
  MessageSquare,
  BarChart,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";

const navItems = [
  { icon: Video, label: "Stream", href: "/stream" },
  { icon: Mic, label: "Audio", href: "/audio" },
  { icon: Users, label: "Guests", href: "/guests" },
  { icon: MessageSquare, label: "Chat", href: "/chat" },
  { icon: BarChart, label: "Analytics", href: "/analytics" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

const SidebarItem = ({
  icon: Icon,
  label,
}: {
  icon: React.ElementType;
  label: string;
}) => (
  <Button variant="ghost" className="w-full justify-start">
    <Icon className="mr-2 h-4 w-4" />
    <span className="hidden md:inline">{label}</span>
  </Button>
);

const StreamStudioLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-background text-foreground">
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border shadow-lg overflow-y-auto"
          >
            <div className="p-4">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-primary">
                  OpenStreamer
                </h1>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>
              <nav>
                <ul className="space-y-2">
                  {navItems.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className="flex items-center p-2 rounded-lg hover:bg-accent transition-colors"
                      >
                        <item.icon className="mr-3 h-5 w-5" />
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
      <div className="hidden lg:flex flex-col w-64 bg-card border-r border-border">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-primary">OpenStreamer</h1>
        </div>
        <nav>
          <ul className="space-y-2">
            {navItems.map((item) => (
              <SidebarItem key={item.label} icon={item.icon} label={item.label} />
            ))}
          </ul>
        </nav>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-card border-b border-border p-4 flex justify-between items-center">
          <Button
            variant="ghost"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden"
          >
            <Menu className="h-6 w-6" />
          </Button>
          <div className="flex items-center space-x-4 justify-end w-full">
            <Button
              variant="outline"
              className="bg-destructive text-destructive-foreground"
            >
              End Stream
            </Button>
            <Button className="bg-primary text-primary-foreground">
              Go Live
            </Button>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
};

export default StreamStudioLayout;
