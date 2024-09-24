import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Upload, Brain, MessageSquare, ClipboardList, Star } from "lucide-react";

const steps = [
    {
        number: 1,
        title: "Upload Your Details",
        description: "Share your CV and target job description with our secure platform.",
        icon: Upload
    },
    {
        number: 2,
        title: "AI Analysis",
        description: "Our AI creates a personalized interview strategy based on your profile.",
        icon: Brain
    },
    {
        number: 3,
        title: "Practice Sessions",
        description: "Engage in AI-powered mock interviews at your convenience.",
        icon: MessageSquare
    },
    {
        number: 4,
        title: "Receive Feedback",
        description: "Get instant, constructive feedback to refine your responses.",
        icon: ClipboardList
    }
];

export const Process = () => {
    return (
        <section className="w-full bg-gray-100 px-8 md:py-12 md:pb-8 lg:py-12">
            <div className="container mx-auto">
                <div className="flex flex-col items-center mb-10">
                    <h2 className="text-3xl font-bold text-center mb-2">Your Path to Interview Success</h2>
                    <p className="text-center text-gray-600">Master the interview process with our AI-powered platform</p>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center  px-16">
                    {steps.map((step, index) => (
                        <div className="flex items-center" key={index}>
                            <div className="flex items-start md:items-center">
                                <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white mr-3 bg-blue-600">
                                    {step.number}
                                </div>

                                <div className="flex-row items-start">
                                    <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                                    <p className="text-gray-600 text-sm">{step.description}</p>
                                </div>
                            </div>

                            {index < steps.length - 1 && (
                                <ChevronRight className="hidden md:block text-gray-600 mx-4" />
                            )}
                        </div>
                    ))}
                </div>

                <div className="flex justify-center mt-10">
                    <p className="text-center font-semibold text-gray-600">Step 5: Enter your real interview with confidence and prepared responses.</p>
                </div>
            </div>
        </section>
    );
};