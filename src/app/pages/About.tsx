import React from 'react';
import { Card, CardContent } from '@/app/components/ui/card';
import { Target, Eye, Award, Users } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-blue-100 py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold text-center mb-4">About MauriPay</h1>
        <p className="text-xl text-center text-gray-600 mb-12">
          Revolutionizing credit access for Mauritius' micro-entrepreneurs
        </p>

        <Card className="mb-8">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-700 mb-4">
              MauriPay is a bank-agnostic alternative credit scoring platform designed specifically for 
              micro-entrepreneurs, freelancers, and small businesses in Mauritius. We believe that traditional 
              credit scoring methods often exclude hardworking individuals who lack formal credit history 
              but demonstrate strong financial behavior.
            </p>
            <p className="text-gray-700">
              Our platform analyzes real financial behaviour—payment consistency, income stability, transaction 
              patterns, and cash flow health—to provide a fairer, more comprehensive assessment of creditworthiness.
            </p>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Our Goal</h3>
              <p className="text-gray-700 text-sm">
                To democratize access to finance by providing fair credit assessments based on actual 
                financial behavior, not just credit history.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="bg-teal-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Eye className="h-6 w-6 text-teal-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Our Vision</h3>
              <p className="text-gray-700 text-sm">
                A Mauritius where every entrepreneur has fair access to finance, empowering economic 
                growth and financial inclusion across all communities.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Our Approach</h3>
              <p className="text-gray-700 text-sm">
                We use transparent, explainable algorithms that show you exactly how your score is calculated 
                and provide actionable recommendations for improvement.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Our Commitment</h3>
              <p className="text-gray-700 text-sm">
                Full compliance with GDPR and Mauritius Data Protection Act, ensuring your data privacy 
                and security are always protected.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
