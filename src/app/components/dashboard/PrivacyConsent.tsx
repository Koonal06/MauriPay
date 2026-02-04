import React from 'react';
import { useCredit } from '@/app/contexts/CreditContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Switch } from '@/app/components/ui/switch';
import { Label } from '@/app/components/ui/label';
import { Shield, Lock, Users, AlertCircle } from 'lucide-react';

export const PrivacyConsent: React.FC = () => {
  const { consentSettings, updateConsent } = useCredit();

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      <div className="mb-6">
        <h3 className="text-2xl font-bold mb-2">Privacy & Consent Management</h3>
        <p className="text-gray-600">
          Control how your data is used. Compliant with GDPR and Mauritius Data Protection Act 2017.
        </p>
      </div>

      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-4 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
          <div className="text-sm text-blue-900">
            <p className="font-semibold mb-1">Data Protection Notice</p>
            <p>
              MauriPay is not designed for collecting personally identifiable information (PII) or sensitive data. 
              All data processing follows strict privacy standards and is used solely for credit assessment purposes.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 rounded-full p-2">
              <Shield className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <CardTitle>Credit Scoring</CardTitle>
              <CardDescription>
                Allow MauriPay to analyze your transaction data for credit scoring
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <Label htmlFor="credit-scoring" className="text-base">
              Enable Credit Scoring Analysis
            </Label>
            <Switch
              id="credit-scoring"
              checked={consentSettings.creditScoring}
              onCheckedChange={(checked) => updateConsent('creditScoring', checked)}
            />
          </div>
          <p className="text-sm text-gray-600 mt-3">
            This analyzes your payment patterns, transaction frequency, and cash flow to generate your credit score.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="bg-teal-100 rounded-full p-2">
              <Lock className="h-5 w-5 text-teal-600" />
            </div>
            <div>
              <CardTitle>Loan Eligibility</CardTitle>
              <CardDescription>
                Use your credit score to determine loan eligibility and offers
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <Label htmlFor="loan-eligibility" className="text-base">
              Enable Loan Matching
            </Label>
            <Switch
              id="loan-eligibility"
              checked={consentSettings.loanEligibility}
              onCheckedChange={(checked) => updateConsent('loanEligibility', checked)}
            />
          </div>
          <p className="text-sm text-gray-600 mt-3">
            This allows us to match you with suitable loan products based on your credit profile.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="bg-purple-100 rounded-full p-2">
              <Users className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <CardTitle>Third-Party Sharing</CardTitle>
              <CardDescription>
                Share anonymized credit score with partner financial institutions
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <Label htmlFor="third-party" className="text-base">
              Allow Third-Party Sharing
            </Label>
            <Switch
              id="third-party"
              checked={consentSettings.thirdPartySharing}
              onCheckedChange={(checked) => updateConsent('thirdPartySharing', checked)}
            />
          </div>
          <p className="text-sm text-gray-600 mt-3">
            Only your score and eligibility tier are shared. No personal transaction details are disclosed.
          </p>
        </CardContent>
      </Card>

      <Card className="bg-gray-50">
        <CardHeader>
          <CardTitle className="text-base">Your Rights</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-gray-700">
          <p>• <strong>Right to Access:</strong> Request a copy of all data we hold about you</p>
          <p>• <strong>Right to Rectification:</strong> Correct any inaccurate information</p>
          <p>• <strong>Right to Erasure:</strong> Request deletion of your data at any time</p>
          <p>• <strong>Right to Object:</strong> Opt-out of any data processing activity</p>
          <p>• <strong>Right to Portability:</strong> Export your data in a standard format</p>
        </CardContent>
      </Card>
    </div>
  );
};
