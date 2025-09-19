export interface ScoreResult {
    TR: number;    // Task Response
    CC: number;    // Coherence and Cohesion
    LR: number;    // Lexical Resource
    GA: number;    // Grammatical Accuracy
    OVERALL: number;
    time: number;
}

export interface ScoreCardProps {
    title: string;
    score: number;
    colorClass: string;
    bgClass: string;
    borderClass: string;
}
