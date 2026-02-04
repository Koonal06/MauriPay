import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface CreditScoreCircleProps {
  score: number;
}

export const CreditScoreCircle: React.FC<CreditScoreCircleProps> = ({ score }) => {
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setDisplayScore(score), 100);
    return () => clearTimeout(timer);
  }, [score]);

  const getScoreColor = (score: number): string => {
    if (score >= 80) return '#10b981'; // Emerald
    if (score >= 70) return '#22c55e'; // Green
    if (score >= 60) return '#3b82f6'; // Blue
    if (score >= 50) return '#f59e0b'; // Orange
    return '#ef4444'; // Red
  };

  const getScoreLabel = (score: number): string => {
    if (score >= 80) return 'Excellent';
    if (score >= 70) return 'Good';
    if (score >= 60) return 'Fair';
    if (score >= 50) return 'Building';
    return 'Poor';
  };

  const circumference = 2 * Math.PI * 90;
  const strokeDashoffset = circumference - (displayScore / 100) * circumference;
  const color = getScoreColor(score);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-64 h-64">
        <svg className="transform -rotate-90 w-64 h-64">
          {/* Background circle */}
          <circle
            cx="128"
            cy="128"
            r="90"
            stroke="#e5e7eb"
            strokeWidth="16"
            fill="none"
          />
          {/* Animated score circle */}
          <motion.circle
            cx="128"
            cy="128"
            r="90"
            stroke={color}
            strokeWidth="16"
            fill="none"
            strokeLinecap="round"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            style={{
              strokeDasharray: circumference,
            }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
            className="text-center"
          >
            <div className="text-6xl font-bold" style={{ color }}>
              {Math.round(displayScore)}
            </div>
            <div className="text-lg text-gray-600 mt-1">
              {getScoreLabel(score)}
            </div>
          </motion.div>
        </div>
      </div>
      <p className="text-sm text-gray-500 mt-4 text-center max-w-xs">
        Your credit score updates in real-time based on your financial behaviour
      </p>
    </div>
  );
};
