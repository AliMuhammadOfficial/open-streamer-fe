"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  ChevronRight,
  Play,
  Zap,
  Users,
  Globe,
  Menu,
  X,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
} from "lucide-react";
import Link from "next/link";

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 overflow-x-hidden">
      <header className="container mx-auto py-4 px-4 md:py-6 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold text-primary"
        >
          OpenStreamer
        </motion.div>
        <nav className="hidden md:flex space-x-4">
          <Button variant="ghost">Features</Button>
          <Button variant="outline" asChild>
            <Link href="/login">Log In</Link>
          </Button>
          <Button asChild>
            <Link href="/register">Sign Up</Link>
          </Button>
        </nav>
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="md:hidden fixed top-0 right-0 h-full w-64 bg-background shadow-lg p-4 z-50"
          >
            <div className="flex justify-end mb-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(false)}
              >
                <X />
              </Button>
            </div>
            <Button
              variant="ghost"
              className="w-full mb-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Button>
            <Button
              variant="outline"
              className="w-full mb-2"
              asChild
              onClick={() => setIsMenuOpen(false)}
            >
              <Link href="/login">Log In</Link>
            </Button>
            <Button
              className="w-full"
              asChild
              onClick={() => setIsMenuOpen(false)}
            >
              <Link href="/register">Sign Up</Link>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="container mx-auto mt-10 md:mt-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Elevate Your Streaming Experience
          </h1>
          <p className="text-lg md:text-xl mb-8 text-muted-foreground max-w-2xl mx-auto">
            Unleash your creativity with OpenStreamer&apos;s cutting-edge
            platform. Engage your audience like never before with interactive
            features and stunning quality.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button size="lg" className="w-full sm:w-auto group">
              Start Streaming
              <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto group"
            >
              Watch Streams
              <Play className="ml-2 group-hover:scale-110 transition-transform" />
            </Button>
          </div>
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
              <div className="aspect-video rounded-t-xl bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center group cursor-pointer">
                <Play className="w-20 h-20 text-primary-foreground group-hover:scale-110 transition-transform" />
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
          className="mt-20"
        >
          <h2 className="text-3xl font-bold mb-10 text-center">
            What Our Streamers Say
          </h2>
          <div className="relative max-w-4xl mx-auto">
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="bg-card/50 backdrop-blur-sm p-8 rounded-lg shadow-lg"
              >
                <p className="text-lg mb-4 italic">
                  &ldquo;{testimonials[currentTestimonial].text}&rdquo;
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mr-4">
                    <span className="text-xl font-bold">
                      {testimonials[currentTestimonial].author[0]}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold">
                      {testimonials[currentTestimonial].author}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {testimonials[currentTestimonial].role}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            <button
              onClick={prevTestimonial}
              className="absolute left-8 top-1/2 -translate-y-1/2 -translate-x-full bg-background rounded-full p-2 shadow-lg md:-translate-x-1/2"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-8 top-1/2 -translate-y-1/2 translate-x-full bg-background rounded-full p-2 shadow-lg md:translate-x-1/2"
            >
              <ChevronRightIcon />
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.2 }}
          className="mt-20 text-center"
        >
          <h2 className="text-3xl font-bold mb-6">
            Ready to start your streaming journey?
          </h2>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Input placeholder="Enter your email" className="max-w-xs w-full" />
            <Button className="w-full sm:w-auto group">
              Get Started
              <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </motion.div>
      </main>

      <footer className="container mx-auto mt-20 py-6 px-4 text-center text-muted-foreground">
        © 2024 OpenStreamer. All rights reserved.
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
  <Card className="bg-card/50 backdrop-blur-sm border-0 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
    <CardContent className="p-6">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-4"
      >
        {icon}
      </motion.div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

const testimonials = [
  {
    text: "OpenStreamer has completely transformed my streaming experience. The interactive features are a game-changer!",
    author: "Alex Johnson",
    role: "Tech Enthusiast",
  },
  {
    text: "I've never felt more connected to my audience. The real-time engagement is incredible!",
    author: "Samantha Lee",
    role: "Fitness Streamer",
  },
  {
    text: "The global reach of OpenStreamer has allowed me to connect with fans from all over the world. It's amazing!",
    author: "Carlos Rodriguez",
    role: "Gaming Streamer",
  },
];

export default LandingPage;
