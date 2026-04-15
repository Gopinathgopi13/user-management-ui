import React from 'react';
import { Button } from 'antd';
import { HomeOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
      <div className="relative mb-8">
        <h1 className="text-[150px] font-black text-slate-100 leading-none select-none">
          404
        </h1>
        <div className="absolute inset-0 flex items-center justify-center">
          <h2 className="text-4xl font-bold text-text-primary tracking-tight">
            Page Not Found
          </h2>
        </div>
      </div>

      <p className="text-text-secondary text-lg max-w-md mb-10">
        Oops! It seems like you've wandered into uncharted territory. 
        The page you're looking for doesn't exist or has been moved.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <Button 
          type="primary" 
          size="large" 
          icon={<HomeOutlined />} 
          onClick={() => navigate('/')}
          className="h-12 px-8 rounded-xl font-semibold shadow-lg shadow-primary/20"
        >
          Back to Home
        </Button>
        <Button 
          size="large" 
          icon={<ArrowLeftOutlined />} 
          onClick={() => navigate(-1)}
          className="h-12 px-8 rounded-xl font-semibold border-border-subtle hover:text-primary hover:border-primary transition-all"
        >
          Go Back
        </Button>
      </div>

      {/* Subtle background decoration */}
      <div className="fixed bottom-10 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl opacity-50 -z-10" />
      <div className="fixed top-10 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl opacity-50 -z-10" />
    </div>
  );
};

export default NotFound;
