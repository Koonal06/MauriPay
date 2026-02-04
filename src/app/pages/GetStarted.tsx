import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/app/contexts/AuthContext';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Checkbox } from '@/app/components/ui/checkbox';

export const GetStarted: React.FC = () => {
  const navigate = useNavigate();
  const { signup, login } = useAuth();
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    businessType: '',
    monthlyIncome: 0,
    consent: false,
  });

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupData.consent) {
      alert('Please accept the terms and conditions');
      return;
    }
    signup({
      name: signupData.name,
      email: signupData.email,
      businessType: signupData.businessType,
      monthlyIncome: signupData.monthlyIncome,
    });
    navigate('/dashboard');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(loginData.email, loginData.password);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-blue-100 py-16 px-4">
      <div className="container mx-auto max-w-md">
        <Tabs defaultValue="signup" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
            <TabsTrigger value="login">Login</TabsTrigger>
          </TabsList>

          <TabsContent value="signup">
            <Card>
              <CardHeader>
                <CardTitle>Create Your Account</CardTitle>
                <CardDescription>
                  Start your journey to better financial access
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSignup} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="Name Surname"
                      value={signupData.name}
                      onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="someone@example.com"
                      value={signupData.email}
                      onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="businessType">Business Type</Label>
                    <Select
                      value={signupData.businessType}
                      onValueChange={(value) => setSignupData({ ...signupData, businessType: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your business type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="makeup-artist">Makeup Artist</SelectItem>
                        <SelectItem value="small-shop">Small Shop Owner</SelectItem>
                        <SelectItem value="freelancer">Freelancer</SelectItem>
                        <SelectItem value="artisan">Artisan/Craftsperson</SelectItem>
                        <SelectItem value="food-vendor">Food Vendor</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="income">Average Monthly Income (MUR)</Label>
                    <Input
                      id="income"
                      type="number"
                      placeholder="25000"
                      value={signupData.monthlyIncome || ''}
                      onChange={(e) => setSignupData({ ...signupData, monthlyIncome: Number(e.target.value) })}
                      required
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="consent"
                      checked={signupData.consent}
                      onCheckedChange={(checked) => setSignupData({ ...signupData, consent: checked as boolean })}
                    />
                    <Label htmlFor="consent" className="text-sm">
                      I consent to data usage for credit scoring in compliance with the Mauritius Data Protection Act
                    </Label>
                  </div>

                  <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-teal-600">
                    Create Account
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Welcome Back</CardTitle>
                <CardDescription>
                  Login to access your credit dashboard
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="sarah@example.com"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-teal-600">
                    Login
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
