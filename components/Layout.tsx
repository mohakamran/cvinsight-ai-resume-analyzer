
import React from 'react';
import { View } from '../types';
import { ShieldCheck } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeView: View;
  onViewChange: (view: View) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeView, onViewChange }) => {
  return (
    <div className="min-h-screen bg-[#FDFDFF] text-slate-900 flex flex-col selection:bg-blue-100 selection:text-blue-900">
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 bg-gradient-to-b from-blue-50/50 to-transparent blur-3xl pointer-events-none -z-10" />
      
      <header className="bg-white/90 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <button 
            onClick={() => onViewChange('analyzer')}
            className="flex items-center space-x-2 group transition-transform active:scale-95"
          >
            <div className="w-9 h-9 bg-slate-900 rounded-xl flex items-center justify-center text-white font-bold shadow-md group-hover:bg-blue-600 transition-colors">
              CI
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              CVInsight
            </h1>
          </button>
          
          <nav className="flex items-center space-x-1">
            {[
              { id: 'analyzer', label: 'Analyzer' },
              { id: 'ats-guide', label: 'ATS Guide' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => onViewChange(tab.id as View)}
                className={`px-4 py-2 text-sm font-bold rounded-xl transition-all ${
                  activeView === tab.id
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
          
          <div className="hidden sm:flex items-center px-4 py-1.5 bg-slate-100 rounded-full text-[10px] font-black text-slate-500 uppercase tracking-widest">
            <ShieldCheck className="w-3 h-3 mr-1.5" />
            Secure AI
          </div>
        </div>
      </header>
      
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {children}
      </main>
      
      <footer className="bg-white border-t border-slate-100 py-10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-400 text-sm font-medium">
            &copy; {new Date().getFullYear()} CVInsight AI. English Language Support Only.
          </p>
        </div>
      </footer>
    </div>
  );
};
