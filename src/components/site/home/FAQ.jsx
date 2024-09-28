import { PhoneCall } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const faqs = [
    {
        question: "How does the AI generate interview questions?",
        answer: "Our AI analyzes the job description and your CV to tailor questions that align with the skills and responsibilities listed."
    },
    {
        question: "What kind of feedback can I expect?",
        answer: "You'll receive feedback on key areas like content relevance, delivery, and confidence, along with tips to improve."
    },
    {
        question: "Is my data secure?",
        answer: "Absolutely. We take data privacy seriously, and all your uploads are encrypted and handled securely."
    },
    {
        question: "How accurate is the AI in mimicking real interviews?",
        answer: "Our AI is trained on thousands of real interview scenarios and is regularly updated to reflect current trends. While no simulation is perfect, users consistently report that our AI provides a highly realistic interview experience."
    },
    {
        question: "Can I use this for different types of interviews?",
        answer: "Yes, our platform supports various interview types including technical, behavioral, and industry-specific interviews. When you upload your job description, the AI tailors the experience to match the specific requirements."
    },
    {
        question: "Do you offer human coaching in addition to AI?",
        answer: "Our focus is on providing an AI-driven platform that's accessible and effective. While we don't offer human coaching directly, we do provide resources and tips to help you improve your interview skills."
    },
    {
        question: "Can I review my past interview performances?",
        answer: "Yes, all your practice sessions are recorded and stored in your personal dashboard. You can review your responses, track your progress over time, and see how you've improved in specific areas."
    }
];

export const FAQ = () => (
    <section className="w-full bg-sky-50 px-10 md:py-12 md:pb-8 lg:py-14">
        <div className="container mx-auto">
            <div className="grid lg:grid-cols-2 gap-10">
                <div className="flex gap-10 flex-col">
                    <div className="flex gap-8 flex-col">
                        <div className="flex">
                            <Badge variant="outline">FAQ</Badge>
                        </div>

                        <div className="flex gap-4 flex-col justify-left items-start">
                            <h4 className="text-2xl md:text-5xl tracking-tighter max-w-xl text-left font-semibold leading-tight text-black">
                                Got questions?<br />We have answers.
                            </h4>

                            <p className="text-lg max-w-xl lg:max-w-lg leading-relaxed tracking-tight text-muted-foreground text-left">
                                We've compiled a list of frequently asked questions to help you get started.
                            </p>
                        </div>

                        <div className="flex">
                            <Button className="gap-4" variant="outline">
                                Got more questions? Reach out <PhoneCall className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>

                <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                        <AccordionItem value={`item-${index}`} key={index}>
                            <AccordionTrigger className="text-lg font-semibold">{faq.question}</AccordionTrigger>
                            <AccordionContent>{faq.answer}</AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </div>
    </section>
);