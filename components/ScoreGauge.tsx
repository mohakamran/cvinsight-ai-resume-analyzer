
import React from 'react';

interface ScoreGaugeProps {
  score: number;
  label: string;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

export const ScoreGauge: React.FC<ScoreGaugeProps> = ({ score, label, size = 'md', color = 'blue' }) => {
  const radius = size === 'sm' ? 40 : size === 'md' ? 56 : 76;
  const stroke = size === 'sm' ? 8 : size === 'md' ? 10 : 14;
  const normalizedRadius = radius - stroke;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const colorClasses: Record<string, string> = {
    green: 'text-emerald-500 stroke-emerald-500',
    blue: 'text-blue-600 stroke-blue-600',
    orange: 'text-orange-500 stroke-orange-500',
    red: 'text-rose-500 stroke-rose-500',
  };

  const currentSize = (radius + 5) * 2;

  return (
    <div className="flex flex-col items-center justify-center p-2 select-none">
      <div className="relative" style={{ width: currentSize, height: currentSize }}>
        <svg
          height={currentSize}
          width={currentSize}
          className="transform -rotate-90 block overflow-visible"
        >
          <circle
            stroke="#f1f5f9"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={currentSize / 2}
            cy={currentSize / 2}
          />
          <circle
            className={`transition-all duration-1000 ease-out ${colorClasses[color] || colorClasses.blue}`}
            stroke="currentColor"
            fill="transparent"
            strokeDasharray={circumference + ' ' + circumference}
            style={{ strokeDashoffset }}
            strokeWidth={stroke}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={currentSize / 2}
            cy={currentSize / 2}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <span className={`font-black tracking-tighter text-slate-900 ${size === 'sm' ? 'text-2xl' : size === 'md' ? 'text-4xl' : 'text-5xl'}`}>
            {score}
          </span>
          <span className={`uppercase font-black text-slate-400 tracking-[0.2em] text-center px-2 leading-none mt-1 ${size === 'sm' ? 'text-[7px]' : 'text-[9px]'}`}>
            {label}
          </span>
        </div>
      </div>
    </div>
  );
};
