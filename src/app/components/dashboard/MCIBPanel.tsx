import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { MCIBData } from '@/app/types';
import { FileText, Building, TrendingDown, Clock } from 'lucide-react';

interface MCIBPanelProps {
  mcibData: MCIBData;
}

export const MCIBPanel: React.FC<MCIBPanelProps> = ({ mcibData }) => {
  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h3 className="text-2xl font-bold mb-2">MCIB Background Check</h3>
        <p className="text-gray-600">
          Traditional credit bureau data summary (does not replace behavioural scoring)
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 rounded-full p-2">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <CardTitle>Existing Loans</CardTitle>
                <CardDescription>Active credit facilities</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {mcibData.existingLoans}
            </div>
            <p className="text-sm text-gray-600">
              Total debt: <span className="font-semibold">MUR {mcibData.totalDebt.toLocaleString()}</span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="bg-teal-100 rounded-full p-2">
                <Building className="h-5 w-5 text-teal-600" />
              </div>
              <div>
                <CardTitle>Partner Exposure</CardTitle>
                <CardDescription>Financial institutions</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {mcibData.partnerExposure.map((partner, index) => (
                <Badge key={index} variant="outline" className="mr-2">
                  {partner}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="bg-green-100 rounded-full p-2">
                <TrendingDown className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <CardTitle>Credit History</CardTitle>
                <CardDescription>Overall standing</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Badge className="bg-green-100 text-green-700 mb-3">
              {mcibData.creditHistory}
            </Badge>
            <p className="text-sm text-gray-600">
              No defaults or late payments recorded in the past 12 months
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="bg-purple-100 rounded-full p-2">
                <Clock className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <CardTitle>Past Obligations</CardTitle>
                <CardDescription>Historical data</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-700">
              {mcibData.pastObligations}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <p className="text-sm text-blue-900">
            <strong>Note:</strong> MCIB data provides a traditional credit bureau view. Your MauriPay credit score is based on 
            behavioural analysis and transaction patterns, offering a more comprehensive picture of your creditworthiness.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
