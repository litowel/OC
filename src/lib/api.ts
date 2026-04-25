import { useState, useEffect } from 'react';

// Mock API layer that uses localStorage, making it perfectly compatible with Vercel and GitHub pages without a backend.

export const simulateReport = async (formData: any) => {
  const { profile, funds, challenges, risk, liquidity } = formData;
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));

  const fundsNum = parseFloat(funds) || 100000;
  
  // Logic formulation
  const riskMultiplier = risk === 'High' ? 1.4 : risk === 'Medium' ? 1.15 : 1.05;
  const baseOptYield = 0.04; // 4% base
  
  const optimizedYieldRate = +(baseOptYield * riskMultiplier).toFixed(4);
  const estimatedGains = Math.round(fundsNum * optimizedYieldRate);
  const estimatedSavings = Math.round(fundsNum * 0.015); // Saved from efficiencies

  const report = {
    id: "REP" + Math.floor(Math.random() * 100000),
    createdAt: new Date().toISOString(),
    profile,
    funds: fundsNum,
    risk,
    optimizedYieldRate,
    estimatedGains,
    estimatedSavings,
    challenges
  };

  // Store in localStorage
  const existingUsersInfo = localStorage.getItem('opticore_users');
  const users = existingUsersInfo ? JSON.parse(existingUsersInfo) : [];
  
  users.push({
    id: "USR" + Math.floor(Math.random() * 100000),
    joinedAt: new Date().toISOString(),
    profile,
    reportId: report.id,
    status: 'demo_completed'
  });
  
  localStorage.setItem('opticore_users', JSON.stringify(users));

  return report;
};

export const getAdminUsers = async () => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const existingUsersInfo = localStorage.getItem('opticore_users');
  return existingUsersInfo ? JSON.parse(existingUsersInfo) : [];
};
