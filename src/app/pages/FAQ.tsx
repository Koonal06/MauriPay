import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/app/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';

export const FAQ: React.FC = () => {
  const faqs = [
    {
      question: 'What is alternative credit scoring?',
      answer: 'Alternative credit scoring uses non-traditional data like transaction patterns, payment consistency, and cash flow to assess creditworthiness, instead of relying solely on traditional credit history. This approach is fairer for micro-entrepreneurs and freelancers who may lack formal credit records but demonstrate good financial behavior.',
    },
    {
      question: 'How is my credit score calculated?',
      answer: 'Your score (0-100) is based on five key factors: Payment Consistency (25%), Income Stability (20%), Transaction Frequency (20%), Digital Payment Usage (15%), and Cash Flow Health (20%). Each factor is transparently calculated and explained in your dashboard.',
    },
    {
      question: 'Is my data safe and private?',
      answer: 'Absolutely. MauriPay is fully compliant with GDPR and the Mauritius Data Protection Act 2017. We use bank-grade encryption, never sell your data, and you control all sharing permissions. Our platform is not designed for collecting PII or sensitive personal information.',
    },
    {
      question: 'Do I need to have a bank account?',
      answer: 'No. MauriPay works with cash, card, and mobile money transactions. You can manually input transactions or optionally connect your bank/mobile money accounts for automatic tracking.',
    },
    {
      question: 'How quickly can I get a loan?',
      answer: 'Once you have a qualifying credit score, you can view and apply for loans instantly. Approval times depend on the specific lender, but our platform pre-qualifies you based on your score, making the application process much faster.',
    },
    {
      question: 'Can I improve my credit score?',
      answer: 'Yes! Your score updates in real-time as you add transactions. To improve: maintain consistent income, increase transaction frequency, use digital payments more often, and maintain positive cash flow. Our Insights panel provides personalized recommendations.',
    },
    {
      question: 'What makes MauriPay different from traditional credit bureaus?',
      answer: 'Traditional bureaus like MCIB rely heavily on past credit history and formal loans. MauriPay focuses on real-time financial behavior, making it accessible to micro-entrepreneurs and freelancers who may not have traditional credit records but demonstrate good financial management.',
    },
    {
      question: 'Is there a fee to use MauriPay?',
      answer: 'The basic credit scoring service is free. You only pay if you accept and take out a loan through our partner lenders, and all fees are clearly disclosed upfront.',
    },
    {
      question: 'What happens to my MCIB history?',
      answer: 'MauriPay works alongside MCIB, not as a replacement. We consider MCIB data as part of the overall assessment, but our behavioral scoring provides additional context. Good MCIB history can complement your MauriPay score.',
    },
    {
      question: 'How do I delete my data?',
      answer: 'You can request full data deletion at any time through your Privacy & Consent settings. We will permanently delete all your data within 30 days, as required by data protection laws.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-blue-100 py-16 px-4">
      <div className="container mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold text-center mb-4">Frequently Asked Questions</h1>
        <p className="text-xl text-center text-gray-600 mb-12">
          Find answers to common questions about MauriPay
        </p>

        <Card>
          <CardHeader>
            <CardTitle>Common Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
