"use client";

import Link from "next/link";
import { Button } from "@/presentation/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/presentation/components/ui/card";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-primary-50 to-white">
      {/* Header */}
      <header className="border-b border-zinc-200 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-10 w-10 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">C</span>
            </div>
            <span className="text-xl font-bold text-zinc-900">
              COPD Prediction
            </span>
          </div>
          <nav className="flex items-center space-x-4">
            <Link href="/login">
              <Button variant="outline">Log In</Button>
            </Link>
            <Link href="/register">
              <Button variant="outline">Get Started</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-zinc-900 mb-6">
            AI-Powered COPD Risk Assessment
          </h1>
          <p className="text-xl text-zinc-600 mb-8">
            Upload respiratory audio recordings and get instant AI-powered
            analysis for early COPD detection and risk assessment.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/register">
              <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                Start Free Assessment
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                View Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center text-zinc-900 mb-12">
          How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card>
            <CardHeader>
              <div className="h-12 w-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🎤</span>
              </div>
              <CardTitle>1. Upload Audio</CardTitle>
              <CardDescription>
                Record or upload respiratory audio (breathing sounds, cough)
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="h-12 w-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🧠</span>
              </div>
              <CardTitle>2. AI Analysis</CardTitle>
              <CardDescription>
                Our AI model analyzes spectrograms for COPD indicators
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="h-12 w-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <CardTitle>3. Get Results</CardTitle>
              <CardDescription>
                Receive detailed risk assessment and health recommendations
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-200 bg-white mt-20">
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-zinc-600">
            © 2024 COPD Prediction System. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
