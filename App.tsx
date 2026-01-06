
import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { ResultsDashboard } from './components/ResultsDashboard';
import { ATSGuide } from './components/ATSGuide';
import { analyzeResume } from './services/geminiService';
import { AnalysisState, View } from './types';
import { FileText, Briefcase, Zap, ShieldCheck, Cpu, Upload, AlertCircle, Loader2 } from 'lucide-react';
import { extractTextFromPDF } from './utils/pdfParser';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>('analyzer');
  const [state, setState] = useState<AnalysisState>({
    resumeText: '',
    jobDescription: '',
    isAnalyzing: false,
    result: null,
    error: null,
  });

  const [isProcessingFile, setIsProcessingFile] = useState(false);

  const handleAnalyze = async () => {
    if (!state.resumeText.trim()) {
      setState(prev => ({ ...prev, error: 'Upload a PDF resume to start the audit.' }));
      return;
    }

    setState(prev => ({ ...prev, isAnalyzing: true, error: null }));

    try {
      const result = await analyzeResume(state.resumeText, state.jobDescription);
      
      if (!result.isEnglish) {
        setState(prev => ({ 
          ...prev, 
          isAnalyzing: false, 
          error: 'Only English content is supported. Please upload an English PDF resume.' 
        }));
        return;
      }

      setState(prev => ({ ...prev, result, isAnalyzing: false }));
    } catch (err: any) {
      console.error(err);
      setState(prev => ({ ...prev, isAnalyzing: false, error: 'Audit failed. Check your document and try again.' }));
    }
  };

  const handleReset = () => {
    setState({
      resumeText: '',
      jobDescription: '',
      isAnalyzing: false,
      result: null,
      error: null,
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'resumeText' | 'jobDescription') => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessingFile(true);
    setState(prev => ({ ...prev, error: null }));

    try {
      if (file.type === 'application/pdf') {
        const text = await extractTextFromPDF(file);
        if (!text || text.length < 50) throw new Error("Could not extract sufficient text. Is this a scan?");
        setState(prev => ({ ...prev, [field]: text }));
      } else {
        throw new Error("Strict Policy: Only PDF files are supported.");
      }
    } catch (err: any) {
      setState(prev => ({ ...prev, error: err.message }));
    } finally {
      setIsProcessingFile(false);
      e.target.value = '';
    }
  };

  const renderView = () => {
    if (activeView === 'ats-guide') return <ATSGuide onNavigate={() => setActiveView('analyzer')} />;

    return state.result ? (
      <ResultsDashboard result={state.result} onReset={handleReset} />
    ) : (
      <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black text-slate-900 mb-6 tracking-tighter">
            Smart Resume <span className="text-blue-600">Audit</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
            Professional PDF auditing for modern hiring benchmarks. Standard English resumes only.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-10 rounded-[2rem] border border-slate-100 shadow-sm group">
            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Cpu className="w-7 h-7" />
            </div>
            <h3 className="font-black text-slate-900 mb-2 uppercase tracking-widest text-[10px]">Audit Engine</h3>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">Multi-point extraction of metrics, history, and core skills.</p>
          </div>
          <div className="bg-white p-10 rounded-[2rem] border border-slate-100 shadow-sm group">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h3 className="font-black text-slate-900 mb-2 uppercase tracking-widest text-[10px]">ATS Logic</h3>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">Verify readability and keyword density for applicant systems.</p>
          </div>
          <div className="bg-white p-10 rounded-[2rem] border border-slate-100 shadow-sm group">
            <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Zap className="w-7 h-7" />
            </div>
            <h3 className="font-black text-slate-900 mb-2 uppercase tracking-widest text-[10px]">Gap Analysis</h3>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">Compare your content against specific job requirements instantly.</p>
          </div>
        </div>

        <div className="bg-white rounded-[3rem] shadow-2xl shadow-blue-50 border border-slate-100 overflow-hidden">
          <div className="p-12 space-y-12">
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-100 rounded-[2.5rem] p-12 transition-colors hover:border-blue-200 group">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Upload className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-black text-slate-900 mb-2">Resume Document</h4>
              <p className="text-slate-400 font-medium text-sm mb-10">Click below to upload your PDF file</p>
              
              <label className={`cursor-pointer px-12 py-5 rounded-2xl font-black text-sm transition-all ${isProcessingFile ? 'bg-slate-100 text-slate-400' : 'bg-slate-900 text-white hover:bg-slate-800'}`}>
                {isProcessingFile ? 'Parsing PDF Content...' : 'Upload PDF'}
                <input type="file" accept=".pdf" className="hidden" disabled={isProcessingFile} onChange={(e) => handleFileUpload(e, 'resumeText')} />
              </label>

              {state.resumeText && (
                <div className="mt-10 flex items-center text-emerald-600 font-black text-xs uppercase tracking-widest animate-in fade-in">
                  <FileText className="w-4 h-4 mr-2" />
                  PDF Attached
                </div>
              )}
            </div>

            <div className="space-y-4">
              <label className="flex items-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <Briefcase className="w-4 h-4 mr-3 text-blue-600" />
                Job Description (Optional)
              </label>
              <textarea
                className="w-full h-32 p-6 bg-slate-50 border border-slate-100 rounded-[2rem] focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none text-slate-700 placeholder:text-slate-300 font-medium text-sm resize-none"
                placeholder="Paste the target listing here to check for match fit..."
                value={state.jobDescription}
                onChange={(e) => setState(prev => ({ ...prev, jobDescription: e.target.value }))}
              />
            </div>

            {state.error && (
              <div className="p-6 bg-rose-50 border border-rose-100 text-rose-600 rounded-[2rem] text-sm font-bold flex items-start">
                <AlertCircle className="w-5 h-5 mr-4 flex-shrink-0" />
                {state.error}
              </div>
            )}

            <button
              onClick={handleAnalyze}
              disabled={state.isAnalyzing || isProcessingFile || !state.resumeText}
              className={`w-full py-6 rounded-[2rem] font-black text-white transition-all flex items-center justify-center space-x-4 text-xl ${
                state.isAnalyzing || isProcessingFile || !state.resumeText
                  ? 'bg-slate-100 text-slate-300 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-100'
              }`}
            >
              {state.isAnalyzing ? (
                <>
                  <Loader2 className="animate-spin h-7 w-7" />
                  <span>Analyzing Metrics...</span>
                </>
              ) : (
                <>
                  <Zap className="w-6 h-6 fill-current" />
                  <span>Start Full Audit</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Layout activeView={activeView} onViewChange={setActiveView}>
      {renderView()}
    </Layout>
  );
};

export default App;
