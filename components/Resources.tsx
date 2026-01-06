
import React from 'react';
import { Download, ExternalLink, BookOpen, MessageSquare, Video, FileCheck } from 'lucide-react';

export const Resources: React.FC = () => {
  const resources = [
    {
      title: "Action Verbs List",
      desc: "Power up your experience section with 200+ high-impact verbs.",
      icon: <Zap className="w-6 h-6 text-amber-500" />,
      type: "PDF Guide"
    },
    {
      title: "Google Sheets Tracker",
      desc: "Stay organized. Track applications, interviews, and follow-ups.",
      icon: <Layout className="w-6 h-6 text-emerald-500" />,
      type: "Template"
    },
    {
      title: "LinkedIn Profile Tips",
      desc: "Learn how to optimize your digital presence for recruiters.",
      icon: <ExternalLink className="w-6 h-6 text-blue-500" />,
      type: "Article"
    },
    {
      title: "Interview Cheat Sheet",
      desc: "Common STAR method questions and perfect sample answers.",
      icon: <MessageSquare className="w-6 h-6 text-purple-500" />,
      type: "Study Guide"
    },
    {
      title: "Video Interview Master",
      desc: "Technical setup and body language tips for remote hiring.",
      icon: <Video className="w-6 h-6 text-rose-500" />,
      type: "Checklist"
    },
    {
      title: "Standard Template",
      desc: "The 'Old Reliable' - high ATS compliance resume format.",
      icon: <FileCheck className="w-6 h-6 text-slate-500" />,
      type: "Word Doc"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h2 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Career Resources
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl">
            Everything you need to accelerate your job search, from templates to interview scripts.
          </p>
        </div>
        <div className="flex items-center space-x-2 px-4 py-2 bg-white rounded-xl border border-slate-200 shadow-sm text-sm font-medium text-slate-600">
          <BookOpen className="w-4 h-4" />
          <span>Curated by Career Coaches</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((res, i) => (
          <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all group flex flex-col h-full">
            <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white transition-colors">
              {res.icon}
            </div>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">{res.type}</span>
              <Download className="w-4 h-4 text-slate-300 group-hover:text-blue-500 transition-colors" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors">{res.title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-grow">{res.desc}</p>
            <button className="w-full py-3 bg-slate-50 text-slate-700 font-bold rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-all text-sm">
              Access Resource
            </button>
          </div>
        ))}
      </div>
      
      <div className="mt-16 bg-gradient-to-br from-indigo-600 to-blue-700 rounded-[2.5rem] p-12 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
        <h3 className="text-3xl font-bold mb-4">Want personalized coaching?</h3>
        <p className="text-blue-100 max-w-xl mx-auto mb-8 text-lg">
          Join our weekly newsletter for exclusive job search strategies and early access to new AI features.
        </p>
        <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-3">
          <input 
            type="email" 
            placeholder="your@email.com" 
            className="flex-grow px-5 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-blue-200 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
          />
          <button className="px-8 py-3 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-colors shadow-lg">
            Join Now
          </button>
        </div>
      </div>
    </div>
  );
};

const Zap = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
);

const Layout = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
);
