
import React from 'react';
import { ShieldCheck, Info, FileText, Layout, Key, AlertTriangle } from 'lucide-react';

interface ATSGuideProps {
  onNavigate: () => void;
}

export const ATSGuide: React.FC<ATSGuideProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center mb-12">
        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-widest mb-4">
          Master the Machine
        </div>
        <h2 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
          How to Beat the ATS
        </h2>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          Over 75% of resumes are rejected by bots before a human ever sees them. Learn how to ensure you're in the top 25%.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Key className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-3">Keyword Optimization</h3>
          <p className="text-slate-600 leading-relaxed mb-4">
            ATS systems scan for specific nouns and verbs matching the job description. If the job asks for "Strategic Planning," don't just write "Planning."
          </p>
          <div className="p-4 bg-slate-50 rounded-xl text-sm italic text-slate-500 border-l-4 border-blue-400">
            "Match your skills directly to the terminology used in the job post."
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Layout className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-3">Standard Formatting</h3>
          <p className="text-slate-600 leading-relaxed mb-4">
            Avoid complex layouts, columns, or tables. Many older systems "read" from left to right across the whole page, scrambling your content.
          </p>
          <div className="flex items-center space-x-2 text-sm font-semibold text-emerald-700">
            <ShieldCheck className="w-4 h-4" />
            <span>Stick to a single-column layout</span>
          </div>
        </div>
      </div>

      <section className="bg-slate-900 rounded-[2.5rem] p-10 text-white mb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-3xl -mr-20 -mt-20" />
        <h3 className="text-2xl font-bold mb-8 flex items-center">
          <AlertTriangle className="w-6 h-6 text-amber-400 mr-3" />
          Top 5 ATS Mistakes
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {[
            { title: "Using Tables/Columns", desc: "Causes text to be read in the wrong order." },
            { title: "Headers & Footers", desc: "Many systems skip content inside header/footer areas." },
            { title: "Graphic Elements", desc: "Logos, charts, and photos cannot be parsed as text." },
            { title: "Non-Standard Fonts", desc: "Stick to Arial, Calibri, or Inter for safety." },
            { title: "Keyword Stuffing", desc: "Modern AI detects unnatural repetition." },
          ].map((item, i) => (
            <div key={i} className="flex items-start space-x-4">
              <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center flex-shrink-0 text-slate-400 font-bold border border-slate-700">
                {i + 1}
              </div>
              <div>
                <h4 className="font-bold mb-1">{item.title}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="bg-blue-50 border border-blue-100 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-6">
        <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-200">
          <FileText className="w-8 h-8 text-white" />
        </div>
        <div className="text-center md:text-left">
          <h4 className="text-lg font-bold text-slate-900 mb-1">Ready to test your resume?</h4>
          <p className="text-slate-600">Use our AI Analyzer to see exactly how an ATS interprets your data.</p>
        </div>
        <button 
          onClick={onNavigate}
          className="whitespace-nowrap px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors md:ml-auto shadow-lg shadow-blue-200"
        >
          Go to Analyzer
        </button>
      </div>
    </div>
  );
};
