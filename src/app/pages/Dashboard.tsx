import React from 'react';
import { useAuth } from '@/app/contexts/AuthContext';
import { useCredit } from '@/app/contexts/CreditContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/app/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { CreditScoreCircle } from '@/app/components/dashboard/CreditScoreCircle';
import { ScoreBreakdownNew } from '@/app/components/dashboard/ScoreBreakdownNew';
import { LoanEligibility } from '@/app/components/dashboard/LoanEligibility';
import { InsightsPanel } from '@/app/components/dashboard/InsightsPanel';
import { TransactionSimulator } from '@/app/components/dashboard/TransactionSimulator';
import { MCIBPanel } from '@/app/components/dashboard/MCIBPanel';
import { PrivacyConsent } from '@/app/components/dashboard/PrivacyConsent';
import { Settings } from '@/app/components/dashboard/Settings';
import { LogOut, User as UserIcon, Settings as SettingsIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar';

export const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const { creditScore, loanOffers, insights, mcibData, transactions } = useCredit();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) {
    navigate('/get-started');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-blue-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={user.profilePicture} alt={user.name} />
                <AvatarFallback className="bg-gradient-to-r from-blue-600 to-teal-600 text-white">
                  {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-semibold text-lg">{user.name}</h2>
                <p className="text-sm text-gray-600">{user.businessType}</p>
              </div>
            </div>
            <Button onClick={handleLogout} variant="outline">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="score" className="space-y-6">
          <TabsList className="grid grid-cols-4 md:grid-cols-8 w-full">
            <TabsTrigger value="score">Credit Score</TabsTrigger>
            <TabsTrigger value="breakdown">Breakdown</TabsTrigger>
            <TabsTrigger value="behaviour">Behaviour</TabsTrigger>
            <TabsTrigger value="loans">Loan Eligibility</TabsTrigger>
            <TabsTrigger value="mcib">MCIB</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="simulator">Simulator</TabsTrigger>
            <TabsTrigger value="settings">
              <SettingsIcon className="h-4 w-4 md:mr-2" />
              <span className="hidden md:inline">Settings</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="score">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="flex items-center justify-center p-8">
                <CreditScoreCircle score={creditScore.overall} />
              </Card>
              
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Score Components</CardTitle>
                    <CardDescription>Quick overview of your scoring categories</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {Object.entries(creditScore.categories).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center">
                        <span className="text-sm capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                        <span className="font-semibold">{value}/100</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {transactions.slice(0, 5).map((transaction) => (
                        <div key={transaction.id} className="flex justify-between text-sm border-b pb-2">
                          <div>
                            <p className="font-medium">{transaction.description}</p>
                            <p className="text-xs text-gray-500">{transaction.date.toLocaleDateString()}</p>
                          </div>
                          <span className="font-semibold">MUR {transaction.amount.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="breakdown">
            <ScoreBreakdownNew creditScore={creditScore} />
          </TabsContent>

          <TabsContent value="behaviour">
            <InsightsPanel insights={insights} />
          </TabsContent>

          <TabsContent value="loans">
            <LoanEligibility loanOffers={loanOffers} />
          </TabsContent>

          <TabsContent value="mcib">
            <MCIBPanel mcibData={mcibData} />
          </TabsContent>

          <TabsContent value="privacy">
            <PrivacyConsent />
          </TabsContent>

          <TabsContent value="simulator">
            <div className="max-w-md mx-auto">
              <TransactionSimulator />
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <Settings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};