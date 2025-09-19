import { FaPaste } from "react-icons/fa";
import { IoMdAnalytics } from "react-icons/io";
import { GiProgression } from "react-icons/gi";

export const testimonials = [
	{
		name: "John Smith",
		avatar: "https://randomuser.me/api/portraits/men/32.jpg",
		score: "Band 7.5",
		feedback:
			"This platform helped me boost my IELTS writing skills tremendously. The AI feedback is detailed and easy to follow!",
	},
	{
		name: "Emily Tran",
		avatar: "https://randomuser.me/api/portraits/women/44.jpg",
		score: "Band 6.5",
		feedback:
			"Beautiful interface, super easy to use. The assessment is realistic and gave me confidence to keep practicing.",
	},
	{
		name: "Michael Lee",
		avatar: "https://randomuser.me/api/portraits/men/65.jpg",
		score: "Band 8.0",
		feedback:
			"The strengths/weaknesses analysis is so useful. I love the improvement suggestions for each criterion.",
	},
	{
		name: "Sophia Nguyen",
		avatar: "https://randomuser.me/api/portraits/women/68.jpg",
		score: "Band 7.0",
		feedback:
			"Community feedback and AI suggestions together made my writing journey fun and effective!",
	},
];

export const steps = [
	{
		icon: FaPaste,
		title: "1. Paste Your Essay",
		desc: "Simply paste your IELTS Writing Task 1 or 2 essay into the platform.",
	},
	{
		icon: IoMdAnalytics,
		title: "2. Get Instant AI Assessment",
		desc: "Receive a band score, detailed feedback, and actionable suggestions within seconds.",
	},
	{
		icon: GiProgression,
		title: "3. Improve & Track Progress",
		desc: "Revise your essay, compare versions, and watch your skills grow with every submission.",
	},
];

export interface Testimonial {
	name: string;
	avatar: string;
	score: string;
	feedback: string;
}

export interface Step {
	icon: string;
	title: string;
	desc: string;
}
