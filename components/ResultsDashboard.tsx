
import React from 'react';
import { AnalysisResult, SectionFeedback } from '../types';
import { ScoreGauge } from './ScoreGauge';
import { 
  CheckCircle2, 
  AlertCircle, 
  Lightbulb, 
  Search, 
  Briefcase, 
  GraduationCap, 
  Trophy, 
  Target,
  ChevronRight,
  TrendingUp,
  Download,
  Zap,
  BarChart3
} from 'lucide-react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell
} from 'recharts';

interface ResultsDashboardProps {
  result: AnalysisResult;
  onReset: () => void;
}

export const ResultsDashboard: React.FC<ResultsDashboardProps> = ({ result, onReset }) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'green';
    if (score >= 60) return 'blue';
    if (score >= 40) return 'orange';
    return 'red';
  };

  const getHexColor = (score: number) => {
    if (score >= 80) return '#10b981';
    if (score >= 60) return '#2563eb';
    if (score >= 40) return '#f59e0b';
    return '#ef4444';
  };

  const downloadReport = () => {
    const report = `CVInsight Audit Report\nOverall: ${result.overallScore}\nATS Compatibility: ${result.atsScore}\n\nStrengths:\n${result.strengths.join('\n')}\n\nWeaknesses:\n${result.weaknesses.join('\n')}`;
    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CVInsight-Report.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const radarData = Object.entries(result.sections).map(([key, data]) => ({
    subject: key.charAt(0).toUpperCase() + key.slice(1),
    A: (data as SectionFeedback).score,
    fullMark: 100,
  }));

  const barData = [
    { name: 'Total', score: result.overallScore },
    { name: 'ATS', score: result.atsScore },
    ...(result.jobMatch.provided ? [{ name: 'Match', score: result.jobMatch.matchingScore }] : [])
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
        <div>
          <h2 className="text-2xl font-black text-slate-900 mb-1">Audit Report</h2>
          <p className="text-slate-500 text-sm font-medium">Metrics extracted from your professional profile.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={downloadReport}
            className="p-3 bg-slate-50 text-slate-500 hover:text-blue-600 rounded-xl transition-all"
          >
            <Download className="w-5 h-5" />
          </button>
          <button 
            onClick={onReset}
            className="px-6 py-3 font-bold text-white bg-slate-900 rounded-xl hover:bg-slate-800 transition-all shadow-lg"
          >
            Start New Audit
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col items-center justify-center min-h-[240px]">
          <ScoreGauge score={result.overallScore} label="Overall Score" size="lg" color={getScoreColor(result.overallScore)} />
        </div>
        
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col items-center justify-center min-h-[240px]">
          <ScoreGauge score={result.atsScore} label="Parser-Ready" size="lg" color={getScoreColor(result.atsScore)} />
        </div>

        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col items-center justify-center min-h-[240px]">
          {result.jobMatch.provided ? (
            <ScoreGauge score={result.jobMatch.matchingScore} label="Match Fit" size="lg" color={getScoreColor(result.jobMatch.matchingScore)} />
          ) : (
            <div className="opacity-40 grayscale flex flex-col items-center">
              <ScoreGauge score={0} label="Match: N/A" size="lg" color="blue" />
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
          <h3 className="font-black text-slate-900 uppercase tracking-widest text-[10px] mb-6">Section Signatures</h3>
          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                <PolarGrid stroke="#f1f5f9" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10, fontWeight: 700 }} />
                <Radar name="Score" dataKey="A" stroke="#2563eb" fill="#3b82f6" fillOpacity={0.5} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
          <h3 className="font-black text-slate-900 uppercase tracking-widest text-[10px] mb-6">Benchmark Comparison</h3>
          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 700 }} />
                <YAxis hide domain={[0, 100]} />
                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="score" radius={[8, 8, 8, 8]} barSize={40}>
                  {barData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getHexColor(entry.score)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden shadow-sm">
            <div className="px-8 py-5 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest">Deep Dive Analysis</h3>
              <Search className="w-4 h-4 text-slate-300" />
            </div>
            <div className="divide-y divide-slate-50">
              {(Object.entries(result.sections) as [string, SectionFeedback][]).map(([key, data]) => (
                <div key={key} className="p-8 hover:bg-slate-50/30 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="capitalize font-black text-slate-900 text-lg">{key}</h4>
                    <span className={`text-base font-black ${data.score >= 70 ? 'text-emerald-600' : 'text-orange-500'}`}>{data.score}%</span>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed font-medium">{data.feedback}</p>
                </div>
              ))}
            </div>
          </section>

          {result.jobMatch.provided && (
            <section className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden shadow-sm p-10">
              <h3 className="font-black text-slate-900 uppercase tracking-widest text-[10px] mb-8">ATS Optimization Data</h3>
              <div className="space-y-10">
                <div>
                   <h4 className="text-[10px] font-bold text-slate-400 uppercase mb-4 tracking-widest">Matched Terminology</h4>
                   <div className="flex flex-wrap gap-2">
                      {result.jobMatch.matchingSections.map((item, i) => (
                        <span key={i} className="px-4 py-1.5 bg-emerald-50 text-emerald-700 rounded-xl text-[10px] font-bold border border-emerald-100">
                          {item}
                        </span>
                      ))}
                   </div>
                </div>
                <div>
                   <h4 className="text-[10px] font-bold text-rose-400 uppercase mb-4 tracking-widest">Missing Critical Keywords</h4>
                   <div className="flex flex-wrap gap-2">
                      {result.jobMatch.missingKeywords.map((item, i) => (
                        <span key={i} className="px-4 py-1.5 bg-rose-50 text-rose-700 rounded-xl text-[10px] font-bold border border-rose-100">
                          {item}
                        </span>
                      ))}
                   </div>
                </div>
              </div>
            </section>
          )}
        </div>

        <div className="space-y-8">
          <section className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
            <h3 className="font-black text-slate-900 uppercase tracking-widest text-[10px] mb-8">Core Strengths</h3>
            <ul className="space-y-5">
              {result.strengths.map((s, i) => (
                <li key={i} className="flex items-start space-x-4 text-sm text-slate-600 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
            <h3 className="font-black text-rose-500 uppercase tracking-widest text-[10px] mb-8">Structural Blind Spots</h3>
            <ul className="space-y-5">
              {result.weaknesses.map((w, i) => (
                <li key={i} className="flex items-start space-x-4 text-sm text-slate-600 font-medium">
                  <AlertCircle className="w-5 h-5 text-rose-500 mt-0.5 flex-shrink-0" />
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-slate-900 p-8 rounded-[2rem] shadow-xl text-white">
            <div className="flex items-center space-x-3 mb-8">
              <Zap className="w-6 h-6 text-amber-400" />
              <h3 className="font-black uppercase tracking-widest text-[10px]">Strategic Plan</h3>
            </div>
            <ul className="space-y-5">
              {result.recommendations.map((r, i) => (
                <li key={i} className="flex items-start space-x-4 text-xs text-slate-300 leading-relaxed">
                  <ChevronRight className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};
