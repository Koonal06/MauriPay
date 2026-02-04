import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { TrendingUp, Shield, Zap, Eye, CreditCard, BarChart3, Lock, Users } from 'lucide-react';

export const Features: React.FC = () => {
  const features = [
    {
      icon: TrendingUp,
      title: 'Real-Time Scoring',
      description: 'Your credit score updates instantly as you add transactions, providing immediate feedback on your financial health.',
      color: 'blue',
    },
    {
      icon: Shield,
      title: 'Bank-Agnostic Platform',
      description: 'Works with all banks and mobile money providers in Mauritius. No vendor lock-in, complete freedom.',
      color: 'teal',
    },
    {
      icon: Eye,
      title: 'Full Transparency',
      description: 'See exactly how your score is calculated with detailed breakdowns for each scoring category.',
      color: 'green',
    },
    {
      icon: BarChart3,
      title: 'Behavioral Analysis',
      description: 'We analyze payment consistency, income stability, transaction frequency, digital usage, and cash flow health.',
      color: 'purple',
    },
    {
      icon: Zap,
      title: 'Instant Loan Matching',
      description: 'Get personalized loan offers based on your credit score, with clear eligibility requirements.',
      color: 'orange',
    },
    {
      icon: Lock,
      title: 'Privacy First',
      description: 'Full GDPR and Mauritius Data Protection Act compliance. Your data is secure and you control all sharing.',
      color: 'red',
    },
    {
      icon: CreditCard,
      title: 'Multi-Channel Support',
      description: 'Track cash, card, and mobile money transactions in one unified platform.',
      color: 'indigo',
    },
    {
      icon: Users,
      title: 'MSME Focused',
      description: 'Built specifically for micro-entrepreneurs, freelancers, and small businesses in Mauritius.',
      color: 'pink',
    },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string }> = {
      blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
      teal: { bg: 'bg-teal-100', text: 'text-teal-600' },
      green: { bg: 'bg-green-100', text: 'text-green-600' },
      purple: { bg: 'bg-purple-100', text: 'text-purple-600' },
      orange: { bg: 'bg-orange-100', text: 'text-orange-600' },
      red: { bg: 'bg-red-100', text: 'text-red-600' },
      indigo: { bg: 'bg-indigo-100', text: 'text-indigo-600' },
      pink: { bg: 'bg-pink-100', text: 'text-pink-600' },
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-blue-100 py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold text-center mb-4">Platform Features</h1>
        <p className="text-xl text-center text-gray-600 mb-12">
          Everything you need for fair and transparent credit assessment
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const colors = getColorClasses(feature.color);
            
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className={`${colors.bg} rounded-full w-12 h-12 flex items-center justify-center mb-4`}>
                    <Icon className={`h-6 w-6 ${colors.text}`} />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="mt-12 bg-gradient-to-r from-blue-600 to-teal-600 text-white">
          <CardHeader>
            <CardTitle className="text-2xl">Scoring Methodology</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span>Payment Consistency</span>
              <span className="font-bold">25%</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Income Stability</span>
              <span className="font-bold">20%</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Transaction Frequency</span>
              <span className="font-bold">20%</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Digital Payment Usage</span>
              <span className="font-bold">15%</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Cash Flow Health</span>
              <span className="font-bold">20%</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
