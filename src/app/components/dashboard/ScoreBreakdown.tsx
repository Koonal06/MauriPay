import React from 'react';
import { motion } from 'motion/react';
import { Progress } from '@/app/components/ui/progress';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { TrendingUp, DollarSign, Activity, CreditCard, Wallet, CheckCircle2, XCircle, Info } from 'lucide-react';
import { CreditScore } from '@/app/types';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/app/components/ui/tooltip';

interface ScoreBreakdownProps {
  creditScore: CreditScore;
}

const categories = [
  {
    key: 'paymentConsistency' as keyof CreditScore['categories'],
    name: 'Payment Consistency',
    weight: 25,
    icon: TrendingUp,
    description: 'Regular and predictable income patterns',
    threshold: 60,
  },
  {
    key: 'incomeStability' as keyof CreditScore['categories'],
    name: 'Income Stability',
    weight: 20,
    icon: DollarSign,
    description: 'Maintaining steady monthly income',
    threshold: 60,
  },
  {
    key: 'transactionFrequency' as keyof CreditScore['categories'],
    name: 'Transaction Frequency',
    weight: 20,
    icon: Activity,
    description: 'Regular business activity and transactions',
    threshold: 50,
  },
  {
    key: 'digitalPaymentUsage' as keyof CreditScore['categories'],
    name: 'Digital Payment Usage',
    weight: 15,
    icon: CreditCard,
    description: 'Using digital payments over cash',
    threshold: 50,
  },
  {
    key: 'cashFlowHealth' as keyof CreditScore['categories'],
    name: 'Cash Flow Health',
    weight: 20,
    icon: Wallet,
    description: 'Positive cash flow trends',
    threshold: 55,
  },
];

export const ScoreBreakdown: React.FC<ScoreBreakdownProps> = ({ creditScore }) => {
  return (
    <div className="space-y-4">
      {categories.map((category, index) => {
        const score = creditScore.categories[category.key];
        const Icon = category.icon;
        const isAccepted = score >= category.threshold;

        return (
          <motion.div
            key={category.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 rounded-full p-2">
                      <Icon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-base flex items-center gap-2">
                        {category.name}
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Info className="h-4 w-4 text-gray-400" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs">{category.description}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </CardTitle>
                      <CardDescription className="text-xs">
                        Weight: {category.weight}% of total score
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold">{score}</span>
                    {isAccepted ? (
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    ) : (
                      <XCircle className="h-5 w-5 text-orange-500" />
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Progress value={score} className="h-2" />
                  <p className="text-sm text-gray-600">
                    {isAccepted ? (
                      <span className="text-green-600">✓ Meets threshold ({category.threshold}+)</span>
                    ) : (
                      <span className="text-orange-600">Need {category.threshold - score} more points to meet threshold</span>
                    )}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
};
