'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from "next/link";

const Page = () => {
  const [countdown, setCountdown] = useState(5);
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev === 1) {
          clearInterval(timer);
          router.push('/jobs');
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  useEffect(() => {
          router.push('/jobs')
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-center space-x-2">
          <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
          <h1 className="text-2xl font-bold text-gray-800">Still in Development</h1>
        </div>
        
        <div className="w-full h-1 bg-gray-200">
          <div 
            className="h-1 bg-blue-500 transition-all duration-1000" 
            style={{ width: `${(1 - countdown / 5) * 100}%` }}
          ></div>
        </div>
        
        <p className="text-gray-600 text-center">
          This page is currently under construction and will be available soon.
        </p>
        
        <div className="pt-4 text-center">
          <Link 
            href="/jobs" 
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Please click here to go to /jobs
          </Link>
        </div>
        
        {countdown > 0 && (
          <p className="text-sm text-gray-500 text-center">
            Auto-redirecting in {countdown} seconds...
          </p>
        )}
      </div>
    </div>
  );
};

export default Page;
