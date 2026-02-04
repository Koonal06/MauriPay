import React, { useState } from 'react';
import { useCredit } from '@/app/contexts/CreditContext';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { PlusCircle } from 'lucide-react';
import { toast } from 'sonner';

export const TransactionSimulator: React.FC = () => {
  const { addTransaction } = useCredit();
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'cash' | 'card' | 'mobile_money'>('mobile_money');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || Number(amount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    addTransaction({
      amount: Number(amount),
      type,
      date: new Date(),
      description: description || 'Transaction',
    });

    toast.success('Transaction added! Your score is updating...', {
      description: 'Check your updated credit score above',
    });

    // Reset form
    setAmount('');
    setDescription('');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Transaction</CardTitle>
        <CardDescription>
          Simulate adding a new transaction to see how it affects your score
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="amount">Amount (MUR)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="1500"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="1"
              step="1"
            />
          </div>

          <div>
            <Label htmlFor="type">Payment Type</Label>
            <Select value={type} onValueChange={(value: any) => setType(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mobile_money">Mobile Money</SelectItem>
                <SelectItem value="card">Card Payment</SelectItem>
                <SelectItem value="cash">Cash</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="description">Description (Optional)</Label>
            <Input
              id="description"
              placeholder="e.g., Bridal makeup service"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-teal-600">
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Transaction
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
