"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ChevronRight, Play, Zap, Users, Globe } from "lucide-react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <header className="container mx-auto py-6 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold text-primary"
        >
            OpenStreamer
        </motion.div>
        <nav>
          <Button variant="ghost">Features</Button>
          <Button variant="outline" className="ml-4">
            Log In
          </Button>
          <Button className="ml-2">Sign Up</Button>
        </nav>
      </header>

      <main className="container mx-auto mt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Elevate Your Streaming Experience
          </h1>
          <p className="text-xl mb-8 text-muted-foreground max-w-2xl mx-auto">
            Unleash your creativity with OpenStreamer&apos;s cutting-edge
            platform. Engage your audience like never before with interactive
            features and stunning quality.
          </p>
          <Button size="lg" className="mr-4">
            Start Streaming <ChevronRight className="ml-2" />
          </Button>
          <Button size="lg" variant="outline">
            Watch Streams <Play className="ml-2" />
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-20 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-3xl"></div>
          <Card className="overflow-hidden border-0 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-0">
              <div className="aspect-video rounded-t-xl bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center">
                <Play className="w-20 h-20 text-primary-foreground" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">
                  Live Now: TechTalk with Sarah
                </h3>
                <p className="text-muted-foreground">
                  Join the discussion on the latest in AI and machine learning!
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <FeatureCard
            icon={<Zap className="w-10 h-10 text-primary" />}
            title="Lightning Fast"
            description="Experience seamless streaming with our low-latency infrastructure."
          />
          <FeatureCard
            icon={<Users className="w-10 h-10 text-primary" />}
            title="Interactive Community"
            description="Engage with your audience through live polls, Q&As, and chat."
          />
          <FeatureCard
            icon={<Globe className="w-10 h-10 text-primary" />}
            title="Global Reach"
            description="Broadcast to millions worldwide with our scalable platform."
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="mt-20 text-center"
        >
          <h2 className="text-3xl font-bold mb-6">
            Ready to start your streaming journey?
          </h2>
          <div className="flex justify-center items-center space-x-4">
            <Input placeholder="Enter your email" className="max-w-xs" />
            <Button>Get Started</Button>
          </div>
        </motion.div>
      </main>

      <footer className="container mx-auto mt-20 py-6 text-center text-muted-foreground">
        © 2024 OpenSteamer. All rights reserved.
      </footer>
    </div>
  );
};

const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <Card className="bg-card/50 backdrop-blur-sm border-0">
    <CardContent className="p-6">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

export default LandingPage;
