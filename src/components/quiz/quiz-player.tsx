"use client";

import { useState } from "react";
import { Quiz, Question, Answer } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Trophy, RefreshCcw, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface QuizPlayerProps {
    quiz: Quiz & {
        questions: (Question & {
            answers: Answer[];
        })[];
    };
}

export function QuizPlayer({ quiz }: QuizPlayerProps) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswerId, setSelectedAnswerId] = useState<string | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);

    const questions = quiz.questions;
    const currentQuestion = questions[currentQuestionIndex];

    const handleAnswer = (answer: Answer) => {
        if (isAnswered) return;
        setSelectedAnswerId(answer.id);
        setIsAnswered(true);
        if (answer.isCorrect) {
            setScore(score + 1);
        }
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswerId(null);
            setIsAnswered(false);
        } else {
            setShowResult(true);
        }
    };

    const handleRestart = () => {
        setCurrentQuestionIndex(0);
        setSelectedAnswerId(null);
        setIsAnswered(false);
        setScore(0);
        setShowResult(false);
    };

    if (showResult) {
        return (
            <Card className="w-full max-w-2xl mx-auto text-center p-8 border-none shadow-lg">
                <CardHeader>
                    <div className="mx-auto bg-emerald-100 p-6 rounded-full w-32 h-32 flex items-center justify-center mb-6 animate-in zoom-in duration-500">
                        <Trophy className="h-16 w-16 text-emerald-600" />
                    </div>
                    <CardTitle className="text-4xl font-serif text-emerald-900 mb-2">Quiz Terminé !</CardTitle>
                    <p className="text-muted-foreground">{quiz.title}</p>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <p className="text-xl text-muted-foreground">Votre score final</p>
                        <div className="text-6xl font-bold text-emerald-600">{score} / {questions.length}</div>
                    </div>
                    <p className="text-lg font-medium text-gray-700">
                        {score === questions.length ? "Excellent ! MashAllah, un sans faute !" :
                            score >= questions.length / 2 ? "Bien joué ! Vous avez de bonnes connaissances." :
                                "Courage ! C'est en révisant qu'on apprend."}
                    </p>
                </CardContent>
                <CardFooter className="justify-center gap-4 pt-6">
                    <Button onClick={handleRestart} variant="outline" size="lg">
                        <RefreshCcw className="mr-2 h-4 w-4" />
                        Recommencer
                    </Button>
                    <Button asChild className="bg-emerald-600 hover:bg-emerald-700" size="lg">
                        <Link href="/quiz">
                            Autres Quiz
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        );
    }

    if (!currentQuestion) {
        return <div>Erreur: Aucune question trouvée.</div>;
    }

    return (
        <Card className="w-full max-w-3xl mx-auto border-none shadow-lg">
            <CardHeader className="bg-emerald-50/50 border-b border-emerald-100">
                <div className="flex justify-between items-center mb-4">
                    <Badge variant="outline" className="bg-white text-emerald-700 border-emerald-200">
                        Question {currentQuestionIndex + 1}/{questions.length}
                    </Badge>
                    <div className="text-sm font-medium text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                        Score: {score}
                    </div>
                </div>
                <CardTitle className="text-2xl md:text-3xl font-serif leading-relaxed text-gray-800">
                    {currentQuestion.text}
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6 md:p-8 space-y-6">
                <div className="grid grid-cols-1 gap-4">
                    {currentQuestion.answers.map((answer) => {
                        const isSelected = selectedAnswerId === answer.id;
                        const isCorrect = answer.isCorrect;

                        // Logic for showing colors:
                        // - If answered:
                        //   - If this is the correct answer: Green (always show correct answer)
                        //   - If this was selected but wrong: Red
                        // - If not answered: Default hover styles

                        let buttonStyle = "h-auto py-6 px-6 justify-start text-lg font-normal transition-all border-2 hover:border-emerald-200 hover:bg-emerald-50";

                        if (isAnswered) {
                            if (isCorrect) {
                                buttonStyle = "h-auto py-6 px-6 justify-start text-lg font-normal bg-green-50 border-2 border-green-500 text-green-900";
                            } else if (isSelected && !isCorrect) {
                                buttonStyle = "h-auto py-6 px-6 justify-start text-lg font-normal bg-red-50 border-2 border-red-500 text-red-900";
                            } else {
                                buttonStyle = "h-auto py-6 px-6 justify-start text-lg font-normal opacity-50";
                            }
                        }

                        return (
                            <Button
                                key={answer.id}
                                variant="ghost"
                                className={buttonStyle}
                                onClick={() => handleAnswer(answer)}
                                disabled={isAnswered}
                            >
                                <div className="flex items-center w-full">
                                    <span className="flex-1 text-left">{answer.text}</span>
                                    {isAnswered && isCorrect && <CheckCircle className="h-6 w-6 text-green-600 ml-3 shrink-0" />}
                                    {isAnswered && isSelected && !isCorrect && <XCircle className="h-6 w-6 text-red-600 ml-3 shrink-0" />}
                                </div>
                            </Button>
                        );
                    })}
                </div>

                {isAnswered && currentQuestion.explanation && (
                    <div className="mt-8 p-6 bg-blue-50 border border-blue-100 rounded-xl animate-in fade-in slide-in-from-top-2">
                        <div className="flex items-start gap-3">
                            <div className="bg-blue-100 p-2 rounded-full text-blue-600 mt-1">
                                <CheckCircle className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="font-bold text-blue-900 mb-2">Explication</p>
                                <p className="text-blue-800 leading-relaxed">{currentQuestion.explanation}</p>
                            </div>
                        </div>
                    </div>
                )}
            </CardContent>
            <CardFooter className="justify-end p-6 bg-gray-50 rounded-b-xl border-t">
                {isAnswered && (
                    <Button onClick={handleNext} size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-lg px-8">
                        {currentQuestionIndex < questions.length - 1 ? (
                            <>
                                Question Suivante
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </>
                        ) : (
                            <>
                                Voir le Résultat
                                <Trophy className="ml-2 h-5 w-5" />
                            </>
                        )}
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
}
