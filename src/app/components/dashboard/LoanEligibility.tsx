import React from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { LoanOffer } from '@/app/types';
import { Lock, Check } from 'lucide-react';

interface LoanEligibilityProps {
  loanOffers: LoanOffer[];
}

export const LoanEligibility: React.FC<LoanEligibilityProps> = ({ loanOffers }) => {
  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h3 className="text-2xl font-bold mb-2">Loan Eligibility</h3>
        <p className="text-gray-600">
          Dynamic loan offers based on your credit score and financial behaviour
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {loanOffers.map((offer, index) => (
          <motion.div
            key={offer.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.15 }}
          >
            <Card className={`relative ${offer.eligible ? 'border-blue-200 shadow-md' : 'opacity-60'}`}>
              {!offer.eligible && (
                <div className="absolute inset-0 bg-gray-100/50 backdrop-blur-sm rounded-lg flex items-center justify-center z-10">
                  <div className="text-center p-4">
                    <Lock className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-600">{offer.lockReason}</p>
                  </div>
                </div>
              )}
              
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{offer.tier}</CardTitle>
                  {offer.eligible && (
                    <Badge className="bg-green-100 text-green-700">
                      <Check className="h-3 w-3 mr-1" />
                      Eligible
                    </Badge>
                  )}
                </div>
                <CardDescription>
                  {offer.term} month term at {offer.interestRate}% APR
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <div className="text-3xl font-bold text-blue-600">
                      MUR {offer.amount.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Loan Amount</div>
                  </div>

                  <div className="border-t pt-3 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Monthly Payment</span>
                      <span className="font-semibold">MUR {offer.monthlyPayment.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Interest Rate</span>
                      <span className="font-semibold">{offer.interestRate}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Term</span>
                      <span className="font-semibold">{offer.term} months</span>
                    </div>
                  </div>

                  <Button
                    className="w-full mt-4"
                    disabled={!offer.eligible}
                    variant={offer.eligible ? 'default' : 'secondary'}
                  >
                    {offer.eligible ? 'Apply Now' : 'Locked'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
