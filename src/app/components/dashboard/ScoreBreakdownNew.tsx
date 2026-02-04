import React from 'react';
import { motion } from 'motion/react';
import { Progress } from '@/app/components/ui/progress';
import { Card, CardContent } from '@/app/components/ui/card';
import { TrendingUp, DollarSign, Activity, CreditCard, Wallet, CheckCircle2, AlertTriangle } from 'lucide-react';
import { CreditScore } from '@/app/types';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/app/components/ui/accordion';
import { Badge } from '@/app/components/ui/badge';
import { useAuth } from '@/app/contexts/AuthContext';

interface ScoreBreakdownProps {
  creditScore: CreditScore;
}

interface CategoryConfig {
  key: keyof CreditScore['categories'];
  name: string;
  maxPoints: number;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  calculation: string;
  goodThreshold: number; // Score >= this is "Good"
  improvementTips: {
    low: string;
    high: string;
  };
}

const categories: CategoryConfig[] = [
  {
    key: 'paymentConsistency',
    name: 'Payment Consistency',
    maxPoints: 20,
    icon: TrendingUp,
    description: 'Measures how regularly you receive payments without long gaps.',
    calculation: 'Points are awarded based on how regularly you receive payments without long gaps. Consistent income patterns earn more points.',
    goodThreshold: 15,
    improvementTips: {
      low: 'To gain more points, maintain steady payment schedules and avoid long gaps between income.',
      high: 'You are performing well in this area. Keep maintaining your consistent payment patterns.',
    },
  },
  {
    key: 'incomeStability',
    name: 'Income Stability',
    maxPoints: 30,
    icon: DollarSign,
    description: 'Evaluates consistency within your chosen income range.',
    calculation: 'Your score depends on consistency within your chosen income range, not how high your income is. We assess whether your income remains stable within your selected range.',
    goodThreshold: 22,
    improvementTips: {
      low: 'To gain more points, maintain steady income and avoid sudden drops within your income range.',
      high: 'Excellent! Your income is stable within your range. Continue this pattern.',
    },
  },
  {
    key: 'transactionFrequency',
    name: 'Transaction Frequency',
    maxPoints: 20,
    icon: Activity,
    description: 'Tracks how often you conduct business transactions.',
    calculation: 'Points are based on the number of regular business transactions you make. More frequent activity shows active business operations.',
    goodThreshold: 14,
    improvementTips: {
      low: 'Add more regular transactions to earn additional points. Increase your business activity.',
      high: 'Great transaction activity! Your business shows healthy regular operations.',
    },
  },
  {
    key: 'digitalPaymentUsage',
    name: 'Digital Payment Usage',
    maxPoints: 15,
    icon: CreditCard,
    description: 'Measures your use of digital payments vs. cash.',
    calculation: 'Higher usage of digital payment methods (card, mobile money) earns more points. Digital payments provide better transaction tracking.',
    goodThreshold: 11,
    improvementTips: {
      low: 'Increase your use of digital payment methods (cards, mobile money) instead of cash transactions.',
      high: 'Perfect! You are effectively using digital payment methods.',
    },
  },
  {
    key: 'cashFlowHealth',
    name: 'Cash Flow Health',
    maxPoints: 15,
    icon: Wallet,
    description: 'Analyzes your overall financial health and trends.',
    calculation: 'Points are based on positive cash flow trends, maintaining healthy balances, and avoiding frequent overdrafts or negative balances.',
    goodThreshold: 11,
    improvementTips: {
      low: 'Work on maintaining positive cash flow and avoid overdrafts. Track your expenses carefully.',
      high: 'Your cash flow is healthy. Continue managing your finances well.',
    },
  },
];

export const ScoreBreakdownNew: React.FC<ScoreBreakdownProps> = ({ creditScore }) => {
  const { user } = useAuth();
  
  // Calculate points earned based on percentage score
  const getPointsEarned = (score: number, maxPoints: number): number => {
    return Math.round((score / 100) * maxPoints);
  };

  const totalPoints = categories.reduce((sum, cat) => sum + cat.maxPoints, 0);
  const earnedPoints = categories.reduce((sum, cat) => {
    return sum + getPointsEarned(creditScore.categories[cat.key], cat.maxPoints);
  }, 0);

  return (
    <div className="space-y-6">
      {/* Total Score Card */}
      <Card className="bg-gradient-to-r from-blue-600 to-teal-600 text-white">
        <CardContent className="pt-6">
          <div className="text-center">
            <p className="text-sm opacity-90 mb-2">Your Credit Score</p>
            <div className="flex items-center justify-center gap-3">
              <span className="text-5xl font-bold">{earnedPoints}</span>
              <span className="text-3xl opacity-75">/ {totalPoints}</span>
            </div>
            <p className="text-sm opacity-90 mt-2">
              {earnedPoints >= 70 ? 'Excellent Score!' : earnedPoints >= 50 ? 'Good Progress!' : 'Keep Building!'}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Score Breakdown Accordion */}
      <Card>
        <CardContent className="pt-6">
          <Accordion type="single" collapsible className="w-full">
            {categories.map((category, index) => {
              const score = creditScore.categories[category.key];
              const pointsEarned = getPointsEarned(score, category.maxPoints);
              const Icon = category.icon;
              const isGood = pointsEarned >= category.goodThreshold;
              const progressPercentage = (pointsEarned / category.maxPoints) * 100;

              return (
                <AccordionItem key={category.key} value={category.key}>
                  <AccordionTrigger className="hover:no-underline">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between w-full pr-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`rounded-full p-2 ${isGood ? 'bg-green-100' : 'bg-yellow-100'}`}>
                          <Icon className={`h-5 w-5 ${isGood ? 'text-green-600' : 'text-yellow-600'}`} />
                        </div>
                        <div className="text-left">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">{category.name}</span>
                            <span className="text-xs text-gray-500">({category.maxPoints} pts)</span>
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant={isGood ? 'default' : 'secondary'} className={isGood ? 'bg-green-600' : 'bg-yellow-600'}>
                              {isGood ? (
                                <>
                                  <CheckCircle2 className="h-3 w-3 mr-1" />
                                  Good
                                </>
                              ) : (
                                <>
                                  <AlertTriangle className="h-3 w-3 mr-1" />
                                  Improve
                                </>
                              )}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold">
                          {pointsEarned} <span className="text-base text-gray-400">/ {category.maxPoints}</span>
                        </div>
                      </div>
                    </motion.div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="pt-4 pb-2 space-y-4 border-t">
                      {/* Points Earned */}
                      <div>
                        <p className="text-sm font-semibold text-gray-700 mb-2">📊 Points Earned</p>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <p className="text-lg">
                            You earned <span className="font-bold text-blue-600">{pointsEarned}</span> out of{' '}
                            <span className="font-bold">{category.maxPoints}</span> points
                          </p>
                          <Progress value={progressPercentage} className="h-2 mt-3" />
                        </div>
                      </div>

                      {/* How Points Are Calculated */}
                      <div>
                        <p className="text-sm font-semibold text-gray-700 mb-2">🧮 How Points Are Calculated</p>
                        <div className="bg-blue-50 rounded-lg p-4">
                          <p className="text-sm text-gray-700">{category.calculation}</p>
                          {category.key === 'incomeStability' && user?.incomeRange && (
                            <div className="mt-3 p-3 bg-white rounded border border-blue-200">
                              <p className="text-xs text-gray-600 mb-1">Your Selected Income Range:</p>
                              <p className="text-sm font-semibold text-blue-600">{user.incomeRange}</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Improvement Guidance */}
                      <div>
                        <p className="text-sm font-semibold text-gray-700 mb-2">
                          {isGood ? '✅ Status' : '💡 Improvement Tips'}
                        </p>
                        <div className={`rounded-lg p-4 ${isGood ? 'bg-green-50' : 'bg-yellow-50'}`}>
                          <p className={`text-sm ${isGood ? 'text-green-700' : 'text-yellow-700'}`}>
                            {isGood ? category.improvementTips.high : category.improvementTips.low}
                          </p>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </CardContent>
      </Card>

      {/* Educational Note */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex gap-3">
            <div className="flex-shrink-0">
              <div className="bg-blue-600 text-white rounded-full p-2">
                <TrendingUp className="h-5 w-5" />
              </div>
            </div>
            <div>
              <p className="font-semibold text-blue-900 mb-1">About Your Score</p>
              <p className="text-sm text-blue-800">
                Your credit score is calculated using a fixed 100-point system. Each factor contributes a specific
                number of points based on your financial behavior. This transparent system ensures fairness and helps
                you understand exactly how to improve your score.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
