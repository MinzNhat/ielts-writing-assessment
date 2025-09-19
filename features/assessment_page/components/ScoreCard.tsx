import React from 'react';
import { ScoreCardProps } from './types';

const ScoreCard: React.FC<ScoreCardProps> = ({ title, score, colorClass, bgClass, borderClass }) => {
    return (
        <div className={`text-center p-6 ${bgClass} rounded-xl border-2 ${borderClass} shadow-lg transform transition-all duration-300 hover:scale-105`}>
            <div className={`font-bold text-sm ${colorClass} mb-2 uppercase tracking-wide`}>
                {title}
            </div>
            <div className={`text-4xl font-black ${colorClass} drop-shadow-sm`}>
                {score}
            </div>
        </div>
    );
};

export default ScoreCard;
