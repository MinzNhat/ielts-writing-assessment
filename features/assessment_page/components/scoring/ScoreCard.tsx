import React, { forwardRef } from 'react';
import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";

interface ScoreCardProps {
    title: string;
    score: number;
    colorClass: string;
    bgClass: string;
    borderClass: string;
    hasFeedback?: boolean;
    onClick?: () => void;
}

const ScoreCard = forwardRef<HTMLDivElement, ScoreCardProps>((
    {
        title,
        score,
        colorClass,
        bgClass,
        borderClass,
        hasFeedback = false,
        onClick
    },
    ref
) => {
    return (
        <Card
            ref={ref}
            className={`${bgClass} ${borderClass} border-2 hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105`}
            onPress={hasFeedback ? onClick : undefined}
            isPressable={hasFeedback}
        >
            <CardBody className="text-center p-6">
                <div className={`font-bold text-sm ${colorClass} mb-2 uppercase tracking-wide`}>
                    {title}
                </div>
                <div className={`text-4xl font-black ${colorClass} drop-shadow-sm`}>
                    {score}
                </div>
                {hasFeedback && (
                    <Button
                        variant="light"
                        size="sm"
                        className={`mt-3 ${colorClass}`}
                        onPress={onClick}
                    >
                        View Feedback
                    </Button>
                )}
            </CardBody>
        </Card>
    );
});

ScoreCard.displayName = 'ScoreCard';

export default ScoreCard;
