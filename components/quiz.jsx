"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";


import { useState, useEffect } from 'react';


const termsAndDefinitions = [
	{ term: "0", definition: "0000" }, // 0
	{ term: "1", definition: "0001" }, // 1 
	{ term: "2", definition: "0010" }, // 2 
	{ term: "3", definition: "0011" }, // 3 
	{ term: "4", definition: "0100" }, // 4 
	{ term: "5", definition: "0101" }, // 5 
	{ term: "6", definition: "0110" }, // 6 
	{ term: "7", definition: "0111" }, // 7 
	{ term: "8", definition: "1000" }, // 8 
	{ term: "9", definition: "1001" }, // 9 
	{ term: "A", definition: "1010" }, // 10
	{ term: "B", definition: "1011" }, // 11
	{ term: "C", definition: "1100" }, // 12
	{ term: "D", definition: "1101" }, // 13
	{ term: "E", definition: "1110" }, // 14
	{ term: "F", definition: "1111" }, // 15
];

export function Quiz() {
	const [currentQuestion, setCurrentQuestion] = useState({});
	const [isTerm, answerWithTerm] = useState(true);
	const [inputValue, setInputValue] = useState('');
	const [score, setScore] = useState({ correct: 0, incorrect: 0 });
	const [remainingTime, setRemainingTime] = useState(60);
	const [flashEffect, setFlashEffect] = useState('');

	const selectRandomQuestion = () => {
		const randomIndex = Math.floor(Math.random() * termsAndDefinitions.length);
		//setIsTerm(Math.random() > 0.5);
		answerWithTerm(false)
		setCurrentQuestion(termsAndDefinitions[randomIndex]);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const correct = (
			(isTerm && inputValue.trim().toLowerCase() === currentQuestion.definition.toLowerCase()) ||
			(!isTerm && inputValue.trim().toLowerCase() === currentQuestion.term.toLowerCase())
		);
		if (correct) {
			setScore({ ...score, correct: score.correct + 1 });
			setFlashEffect('correct');
		} else {
			setScore({ ...score, incorrect: score.incorrect + 1 });
			setFlashEffect('incorrect');
		}
		setTimeout(() => setFlashEffect(''), 500);
		setInputValue('');
		selectRandomQuestion();
	};

	useEffect(() => {
		if (remainingTime > 0) {
			const timer = setTimeout(() => setRemainingTime(remainingTime - 1), 1000);
			return () => clearTimeout(timer);
		}
	}, [remainingTime]);

	useEffect(selectRandomQuestion, []);

	return (
		<main className={`flex flex-col items-center justify-center min-h-screen transition-colors duration-500 ${flashEffect === 'correct' ? 'flash-green' : flashEffect === 'incorrect' ? 'flash-red' : 'bg-background'}`}>
			{!remainingTime ? (
				<Card>
					<CardHeader>
						<CardTitle className="flex justify-between text-2xl">
							Quiz Finished!
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid w-full items-center gap-4">
							<div className="flex flex-col space-y-1.5">
								<p className="text-lg font-medium text-gray-500">Correct answers: {score.correct}</p>
								<p className="text-lg font-medium text-gray-500">Incorrect answers: {score.incorrect}</p>
							</div>
						</div>
					</CardContent>
				</Card>
			) : (
				<>
					<Card className={`w-[350px] ${remainingTime < 30 && "bg-red-50"}`}>
						<CardHeader>
							<CardTitle className="flex justify-between">
								Question {score.correct + score.incorrect + 1} - {isTerm ? "HEX to BIN" : "BIN to HEX"}
								<div className="flex items-center space-x-4">
									<TimerIcon className={`h-6 w-6 ${remainingTime >= 30 ? "text-gray-500" : "text-red-600"}`} />
									<p className={`text-lg font-medium ${remainingTime >= 30 ? "text-gray-500" : "text-red-600"}`}>{String(Math.floor(remainingTime / 60)).padStart(2, '0') + ':' + String(remainingTime % 60).padStart(2, '0')}</p>
								</div>
							</CardTitle>
							<CardDescription className="text-slate-800">
								{isTerm ? currentQuestion.term : currentQuestion.definition}
							</CardDescription>
						</CardHeader>
						<CardContent>
							<form onSubmit={handleSubmit}>
								<div className="grid w-full items-center gap-4">
									<div className="flex flex-col space-y-1.5">
										<Label htmlFor="name">Name</Label>
										<Input
											className="flex-1 p-2 border border-gray-300 rounded-md"
											placeholder={`Type your answer in ${isTerm ? "BINARY" : "HEXIDECIMAL"}`}
											type="text"
											value={inputValue}
											onChange={(e) => setInputValue(e.target.value.toUpperCase())}
											autoFocus
										/>
									</div>
									<div className="flex flex-col space-y-1.5">
										<Button type="submit" className="hover:bg-blue-950">Check</Button>
									</div>
								</div>
							</form>
						</CardContent>
						<CardFooter className="flex justify-between">
							{/*<Popover>
								<PopoverTrigger asChild>
									<Button variant="outline">Settings</Button>
								</PopoverTrigger>
								<PopoverContent className="w-80">
									<div className="grid gap-4">
										<div className="space-y-2">
											<h4 className="font-medium leading-none">Dimensions</h4>
											<p className="text-sm text-muted-foreground">
												Set the dimensions for the layer.
											</p>
										</div>
										<div className="grid gap-2">
											<div className="grid grid-cols-3 items-center gap-4">
												<Label htmlFor="answers">Answer with:</Label>
												<RadioGroup id="answers" onChange={(e) => setIsTerm(e)}>
													<div className="flex items-center space-x-2">
														<RadioGroupItem value={false} id="r1" />
														<Label htmlFor="r1">HEX only</Label>
													</div>
													<div className="flex items-center space-x-2">
														<RadioGroupItem value={true} id="r2" />
														<Label htmlFor="r2">BIN only</Label>
													</div>
													<div className="flex items-center space-x-2">
														<RadioGroupItem value={Math.random() > 0.5} id="r3" />
														<Label htmlFor="r3">Random</Label>
													</div>
												</RadioGroup>
											</div>
										</div>
									</div>
								</PopoverContent>
							</Popover>*/}
							<Button onClick={() => window.location.reload()} className="hover:bg-red-900">Reset</Button>
						</CardFooter>
					</Card>
				</>
			)}
		</main>
	);
}


function TimerIcon(props) {
	return (
		(<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round">
			<line x1="10" x2="14" y1="2" y2="2" />
			<line x1="12" x2="15" y1="14" y2="11" />
			<circle cx="12" cy="14" r="8" />
		</svg>)
	);
}
