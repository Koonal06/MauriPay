import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Transaction, CreditScore, LoanOffer, Insight, MCIBData, ConsentSettings } from '@/app/types';

interface CreditContextType {
  transactions: Transaction[];
  creditScore: CreditScore;
  loanOffers: LoanOffer[];
  insights: Insight[];
  mcibData: MCIBData;
  consentSettings: ConsentSettings;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  updateConsent: (key: keyof ConsentSettings, value: boolean) => void;
}

const CreditContext = createContext<CreditContextType | undefined>(undefined);

// Demo transactions for a makeup artist
const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: '1', amount: 3500, type: 'mobile_money', date: new Date(2026, 0, 18), description: 'Bridal makeup service' },
  { id: '2', amount: 1200, type: 'card', date: new Date(2026, 0, 15), description: 'Event makeup' },
  { id: '3', amount: 800, type: 'cash', date: new Date(2026, 0, 12), description: 'Makeup lesson' },
  { id: '4', amount: 2200, type: 'mobile_money', date: new Date(2026, 0, 10), description: 'Wedding party makeup' },
  { id: '5', amount: 1500, type: 'card', date: new Date(2026, 0, 8), description: 'Photoshoot makeup' },
  { id: '6', amount: 950, type: 'mobile_money', date: new Date(2026, 0, 5), description: 'Regular client' },
  { id: '7', amount: 600, type: 'cash', date: new Date(2026, 0, 3), description: 'Quick touch-up' },
  { id: '8', amount: 2800, type: 'card', date: new Date(2025, 11, 28), description: 'Corporate event' },
];

const calculateCreditScore = (transactions: Transaction[]): CreditScore => {
  const last30Days = transactions.filter(t => {
    const daysDiff = (new Date().getTime() - t.date.getTime()) / (1000 * 3600 * 24);
    return daysDiff <= 30;
  });

  // Payment Consistency (25%)
  const avgAmount = last30Days.reduce((sum, t) => sum + t.amount, 0) / Math.max(last30Days.length, 1);
  const variance = last30Days.reduce((sum, t) => sum + Math.pow(t.amount - avgAmount, 2), 0) / Math.max(last30Days.length, 1);
  const consistency = Math.max(0, Math.min(100, 100 - (Math.sqrt(variance) / avgAmount) * 50));

  // Income Stability (20%)
  const monthlyTotal = last30Days.reduce((sum, t) => sum + t.amount, 0);
  const stability = Math.min(100, (monthlyTotal / 200) * 100); // Assume 20k target

  // Transaction Frequency (20%)
  const frequency = Math.min(100, (last30Days.length / 20) * 100); // Target 20 transactions/month

  // Digital Payment Usage (15%)
  const digitalCount = last30Days.filter(t => t.type !== 'cash').length;
  const digitalUsage = (digitalCount / Math.max(last30Days.length, 1)) * 100;

  // Cash Flow Health (20%)
  const recentTrend = last30Days.slice(0, 5).reduce((sum, t) => sum + t.amount, 0);
  const olderTrend = last30Days.slice(5).reduce((sum, t) => sum + t.amount, 0) || 1;
  const cashFlowHealth = Math.min(100, (recentTrend / olderTrend) * 100);

  const overall = (
    consistency * 0.25 +
    stability * 0.20 +
    frequency * 0.20 +
    digitalUsage * 0.15 +
    cashFlowHealth * 0.20
  );

  return {
    overall: Math.round(overall),
    categories: {
      paymentConsistency: Math.round(consistency),
      incomeStability: Math.round(stability),
      transactionFrequency: Math.round(frequency),
      digitalPaymentUsage: Math.round(digitalUsage),
      cashFlowHealth: Math.round(cashFlowHealth),
    },
  };
};

const generateLoanOffers = (score: CreditScore): LoanOffer[] => {
  const baseOffers: LoanOffer[] = [
    {
      id: 'tier1',
      tier: 'Starter',
      amount: 15000,
      interestRate: 8.5,
      term: 12,
      monthlyPayment: 1350,
      eligible: score.overall >= 50,
      lockReason: score.overall < 50 ? 'Minimum score of 50 required' : undefined,
    },
    {
      id: 'tier2',
      tier: 'Growth',
      amount: 35000,
      interestRate: 7.0,
      term: 18,
      monthlyPayment: 2150,
      eligible: score.overall >= 65,
      lockReason: score.overall < 65 ? 'Minimum score of 65 required' : undefined,
    },
    {
      id: 'tier3',
      tier: 'Premium',
      amount: 75000,
      interestRate: 5.5,
      term: 24,
      monthlyPayment: 3450,
      eligible: score.overall >= 80,
      lockReason: score.overall < 80 ? 'Minimum score of 80 required' : undefined,
    },
  ];

  return baseOffers;
};

const generateInsights = (score: CreditScore, transactions: Transaction[]): Insight[] => {
  const insights: Insight[] = [];

  if (score.categories.digitalPaymentUsage >= 70) {
    insights.push({
      type: 'positive',
      message: 'Excellent digital payment usage! This strengthens your creditworthiness.',
      category: 'Digital Payments',
    });
  }

  if (score.categories.paymentConsistency < 60) {
    insights.push({
      type: 'warning',
      message: 'Transaction amounts vary significantly. More consistent income patterns improve your score.',
      category: 'Consistency',
    });
  }

  if (score.categories.transactionFrequency < 50) {
    insights.push({
      type: 'tip',
      message: 'Increase transaction frequency by recording all business activities.',
      category: 'Activity',
    });
  }

  if (score.overall >= 70) {
    insights.push({
      type: 'positive',
      message: 'You qualify for better loan terms! Check your eligible offers.',
    });
  }

  return insights;
};

export const CreditProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [creditScore, setCreditScore] = useState<CreditScore>(calculateCreditScore(INITIAL_TRANSACTIONS));
  const [loanOffers, setLoanOffers] = useState<LoanOffer[]>([]);
  const [insights, setInsights] = useState<Insight[]>([]);
  const [consentSettings, setConsentSettings] = useState<ConsentSettings>({
    creditScoring: true,
    loanEligibility: true,
    thirdPartySharing: false,
  });

  const mcibData: MCIBData = {
    existingLoans: 1,
    totalDebt: 12000,
    partnerExposure: ['Bank One', 'Credit Union Ltd'],
    creditHistory: 'Good standing',
    pastObligations: 'Personal loan fully repaid (2024)',
  };

  useEffect(() => {
    const newScore = calculateCreditScore(transactions);
    setCreditScore(newScore);
    setLoanOffers(generateLoanOffers(newScore));
    setInsights(generateInsights(newScore, transactions));
  }, [transactions]);

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Math.random().toString(36).substr(2, 9),
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const updateConsent = (key: keyof ConsentSettings, value: boolean) => {
    setConsentSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <CreditContext.Provider
      value={{
        transactions,
        creditScore,
        loanOffers,
        insights,
        mcibData,
        consentSettings,
        addTransaction,
        updateConsent,
      }}
    >
      {children}
    </CreditContext.Provider>
  );
};

export const useCredit = () => {
  const context = useContext(CreditContext);
  if (context === undefined) {
    throw new Error('useCredit must be used within a CreditProvider');
  }
  return context;
};
