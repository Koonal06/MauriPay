import React from 'react';
import { motion } from 'motion/react';
import { Card, CardContent } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Insight } from '@/app/types';
import { CheckCircle, AlertCircle, Lightbulb } from 'lucide-react';

interface InsightsPanelProps {
  insights: Insight[];
}

export const InsightsPanel: React.FC<InsightsPanelProps> = ({ insights }) => {
  const getInsightIcon = (type: Insight['type']) => {
    switch (type) {
      case 'positive':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-orange-600" />;
      case 'tip':
        return <Lightbulb className="h-5 w-5 text-blue-600" />;
    }
  };

  const getInsightColor = (type: Insight['type']) => {
    switch (type) {
      case 'positive':
        return 'bg-green-50 border-green-200';
      case 'warning':
        return 'bg-orange-50 border-orange-200';
      case 'tip':
        return 'bg-blue-50 border-blue-200';
    }
  };

  const getBadgeColor = (type: Insight['type']) => {
    switch (type) {
      case 'positive':
        return 'bg-green-100 text-green-700';
      case 'warning':
        return 'bg-orange-100 text-orange-700';
      case 'tip':
        return 'bg-blue-100 text-blue-700';
    }
  };

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h3 className="text-2xl font-bold mb-2">Insights & Recommendations</h3>
        <p className="text-gray-600">
          Personalized tips to improve your credit score
        </p>
      </div>

      {insights.map((insight, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className={`border ${getInsightColor(insight.type)}`}>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  {getInsightIcon(insight.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {insight.category && (
                      <Badge className={getBadgeColor(insight.type)}>
                        {insight.category}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-700">{insight.message}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}

      {insights.length === 0 && (
        <Card className="border-dashed">
          <CardContent className="p-8 text-center text-gray-500">
            <Lightbulb className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>No insights available yet. Add more transactions to get personalized recommendations.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
