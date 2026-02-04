import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/app/components/ui/button';
import { ArrowRight, TrendingUp, Shield, Zap, Users } from 'lucide-react';

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-blue-100">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <img src="https://res.cloudinary.com/dstpuchpj/image/upload/v1769930693/MauriPay_qohfpo.png" alt="MauriPay" className="h-24 mx-auto mb-8" />
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Your Financial Future, <span className="text-blue-600">Reimagined</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Alternative credit scoring for micro-entrepreneurs, freelancers, and small businesses in Mauritius.
            Get fair access to finance based on your real financial behaviour.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/get-started">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/about">
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Fair Scoring</h3>
            <p className="text-gray-600 text-sm">
              Get scored based on actual financial behaviour, not just credit history.
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="bg-teal-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-teal-600" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Bank-Agnostic</h3>
            <p className="text-gray-600 text-sm">
              Works across all banks and mobile money providers in Mauritius.
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Zap className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Instant Results</h3>
            <p className="text-gray-600 text-sm">
              Real-time credit score updates as you add transactions and improve habits.
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Built for MSMEs</h3>
            <p className="text-gray-600 text-sm">
              Designed specifically for micro-entrepreneurs and small businesses.
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-xl p-8 shadow-lg mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="font-semibold text-lg mb-2">Sign Up & Connect</h3>
              <p className="text-gray-600 text-sm">
                Create your account and optionally connect your bank or mobile money transactions.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-teal-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="font-semibold text-lg mb-2">Get Your Score</h3>
              <p className="text-gray-600 text-sm">
                Receive your credit score instantly based on payment consistency, income stability, and more.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="font-semibold text-lg mb-2">Access Finance</h3>
              <p className="text-gray-600 text-sm">
                View personalized loan offers and apply directly through our platform.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Take Control of Your Financial Future?</h2>
          <p className="text-lg mb-6 opacity-90">
            Join thousands of micro-entrepreneurs already using MauriPay to access fair finance.
          </p>
          <Link to="/get-started">
            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
              Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};