// User and Authentication Types
export interface User {
  id: string;
  name: string;
  email: string;
  businessType: string;
  monthlyIncome: number;
  incomeRange?: string; // New field for range-based income
  profilePicture?: string; // New field for profile picture URL
  createdAt: Date;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

// Transaction Types
export interface Transaction {
  id: string;
  amount: number;
  type: 'cash' | 'card' | 'mobile_money';
  date: Date;
  description: string;
}

// Credit Scoring Types
export interface ScoreCategory {
  name: string;
  value: number;
  weight: number;
  description: string;
  icon: string;
  accepted: boolean;
}

export interface CreditScore {
  overall: number;
  categories: {
    paymentConsistency: number;
    incomeStability: number;
    transactionFrequency: number;
    digitalPaymentUsage: number;
    cashFlowHealth: number;
  };
}

export interface ScoreBreakdown {
  category: string;
  score: number;
  weight: number;
  description: string;
  accepted: boolean;
  explanation: string;
}

// Loan Types
export interface LoanOffer {
  id: string;
  tier: string;
  amount: number;
  interestRate: number;
  term: number; // in months
  monthlyPayment: number;
  eligible: boolean;
  lockReason?: string;
}

// Insight Types
export interface Insight {
  type: 'positive' | 'warning' | 'tip';
  message: string;
  category?: string;
}

// MCIB Background Types
export interface MCIBData {
  existingLoans: number;
  totalDebt: number;
  partnerExposure: string[];
  creditHistory: string;
  pastObligations: string;
}

// Consent Types
export interface ConsentSettings {
  creditScoring: boolean;
  loanEligibility: boolean;
  thirdPartySharing: boolean;
}