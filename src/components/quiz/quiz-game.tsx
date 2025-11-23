"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Trophy, RefreshCcw } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock Questions
const questions = [
    {
        id: 1,
        question: "Combien y a-t-il de piliers de l'Islam ?",
        options: ["3", "5", "6", "7"],
        correctAnswer: "5",
        explanation: "Les 5 piliers sont : La Shahada, la Prière, la Zakat, le Jeûne et le Pèlerinage."
    },
    {
        id: 2,
        question: "Quel prophète a construit l'Arche ?",
        options: ["Moussa (AS)", "Ibrahim (AS)", "Nuh (AS)", "Issa (AS)"],
        correctAnswer: "Nuh (AS)",
        explanation: "Le prophète Nuh (Noé) a construit l'arche sur ordre d'Allah pour échapper au déluge."
    },
    {
        id: 3,
        question: "Quelle sourate est surnommée 'Le Cœur du Coran' ?",
        options: ["Al-Fatiha", "Al-Baqara", "Ya-Sin", "Al-Mulk"],
        correctAnswer: "Ya-Sin",
        explanation: "Le Prophète (paix et bénédiction sur lui) a dit que Ya-Sin est le cœur du Coran."
    },
    {
        id: 4,
        question: "En quelle année a eu lieu l'Hégire ?",
        options: ["610", "622", "632", "570"],
        correctAnswer: "622",
        explanation: "L'Hégire (émigration vers Médine) a eu lieu en 622 après J.C."
    },
    {
        id: 5,
        question: "Combien de fois par jour le musulman doit-il prier ?",
        options: ["3", "4", "5", "6"],
        correctAnswer: "5",
        explanation: "Les 5 prières obligatoires sont : Fajr, Dhuhr, Asr, Maghrib et Isha."
    }
];

export function QuizGame() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);

    const currentQuestion = questions[currentQuestionIndex];

    const handleAnswer = (answer: string) => {
        if (isAnswered) return;
        setSelectedAnswer(answer);
        setIsAnswered(true);
        if (answer === currentQuestion.correctAnswer) {
            setScore(score + 1);
        }
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswer(null);
            setIsAnswered(false);
        } else {
            setShowResult(true);
        }
    };

    const handleRestart = () => {
        setCurrentQuestionIndex(0);
        setSelectedAnswer(null);
        setIsAnswered(false);
        setScore(0);
        setShowResult(false);
    };

    if (showResult) {
        return (
            <Card className="w-full max-w-2xl mx-auto text-center p-8">
                <CardHeader>
                    <div className="mx-auto bg-secondary/10 p-4 rounded-full w-24 h-24 flex items-center justify-center mb-4">
                        <Trophy className="h-12 w-12 text-secondary" />
                    </div>
                    <CardTitle className="text-3xl font-serif text-primary">Quiz Terminé !</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-xl text-muted-foreground">Votre score est de :</p>
                    <div className="text-5xl font-bold text-primary">{score} / {questions.length}</div>
                    <p className="text-muted-foreground">
                        {score === questions.length ? "Excellent ! MashAllah !" :
                            score >= questions.length / 2 ? "Bien joué ! Continuez d'apprendre." :
                                "Courage ! Révisez encore un peu."}
                    </p>
                </CardContent>
                <CardFooter className="justify-center">
                    <Button onClick={handleRestart} size="lg">
                        <RefreshCcw className="mr-2 h-4 w-4" />
                        Recommencer
                    </Button>
                </CardFooter>
            </Card>
        );
    }

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <div className="flex justify-between items-center mb-4">
                    <Badge variant="outline">Question {currentQuestionIndex + 1}/{questions.length}</Badge>
                    <div className="text-sm font-medium text-muted-foreground">Score: {score}</div>
                </div>
                <CardTitle className="text-2xl font-serif leading-relaxed">
                    {currentQuestion.question}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-3">
                    {currentQuestion.options.map((option) => {
                        const isSelected = selectedAnswer === option;
                        const isCorrect = option === currentQuestion.correctAnswer;
                        const showCorrect = isAnswered && isCorrect;
                        const showWrong = isAnswered && isSelected && !isCorrect;

                        return (
                            <Button
                                key={option}
                                variant="outline"
                                className={cn(
                                    "h-auto py-4 px-6 justify-start text-lg font-normal transition-all",
                                    showCorrect && "bg-green-100 border-green-500 text-green-900 hover:bg-green-100 hover:text-green-900 dark:bg-green-900/20 dark:text-green-100",
                                    showWrong && "bg-red-100 border-red-500 text-red-900 hover:bg-red-100 hover:text-red-900 dark:bg-red-900/20 dark:text-red-100",
                                    !isAnswered && "hover:border-primary hover:bg-primary/5"
                                )}
                                onClick={() => handleAnswer(option)}
                                disabled={isAnswered}
                            >
                                <div className="flex items-center w-full">
                                    <span className="flex-1 text-left">{option}</span>
                                    {showCorrect && <CheckCircle className="h-5 w-5 text-green-600 ml-2" />}
                                    {showWrong && <XCircle className="h-5 w-5 text-red-600 ml-2" />}
                                </div>
                            </Button>
                        );
                    })}
                </div>

                {isAnswered && (
                    <div className="mt-6 p-4 bg-muted/50 rounded-lg animate-in fade-in slide-in-from-top-2">
                        <p className="font-semibold mb-1">Explication :</p>
                        <p className="text-muted-foreground">{currentQuestion.explanation}</p>
                    </div>
                )}
            </CardContent>
            <CardFooter className="justify-end">
                {isAnswered && (
                    <Button onClick={handleNext} size="lg">
                        {currentQuestionIndex < questions.length - 1 ? "Question Suivante" : "Voir le Résultat"}
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
}
