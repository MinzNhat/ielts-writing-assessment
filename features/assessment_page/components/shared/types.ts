export interface FeedbackDetail {
	score: number;
	strengths: string;
	weaknesses: string;
	suggestions: string;
}

export interface Feedback {
	"Task Response": FeedbackDetail;
	"Coherence & Cohesion": FeedbackDetail;
	"Lexical Resource": FeedbackDetail;
	"Grammatical Range & Accuracy": FeedbackDetail;
	"Overall": FeedbackDetail;
}

export interface ScoreResult {
	TR: number;    // Task Response
	CC: number;    // Coherence and Cohesion
	LR: number;    // Lexical Resource
	GA: number;    // Grammatical Accuracy
	OVERALL: number;
	time: number;
	feedback?: Feedback;
}

export interface ScoreCardProps {
	title: string;
	score: number;
	colorClass: string;
	bgClass: string;
	borderClass: string;
}
