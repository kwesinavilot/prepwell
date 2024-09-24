import {
    MessageCircleQuestion,
    MessagesSquare,
    Briefcase,
    BarChart2,
    Clock,
    Layers3
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const features = [
    {
        icon: MessageCircleQuestion,
        title: "Personalized Questions",
        description: "AI-generated questions tailored to your CV and job description."
    },
    {
        icon: MessagesSquare,
        title: "Real-time Feedback",
        description: "Instant, actionable insights to improve your responses."
    },
    {
        icon: Briefcase,
        title: "Industry-specific Simulations",
        description: "Practice with scenarios tailored to your target industry."
    },
    {
        icon: BarChart2,
        title: "Performance Analytics",
        description: "Track your progress and identify areas for improvement."
    },
    {
        icon: Clock,
        title: "24/7 Availability",
        description: "Practice anytime, anywhere, at your own pace."
    },
    {
        icon: Layers3,
        title: "Diverse Interview Types",
        description: "Prepare for behavioral, technical, and situational interviews."
    }
];

const FeatureItem = ({ icon: Icon, title, description }) => (
    <div className="flex flex-row gap-6 w-full items-start">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Icon className="w-5 h-5 text-primary" />
        </div>
        <div className="flex flex-col gap-1">
            <p className="font-medium">{title}</p>
            <p className="text-muted-foreground text-sm">{description}</p>
        </div>
    </div>
);

export const Features = () => (
    <section className="w-full bg-orange-100 px-10 md:py-12 md:pb-8 lg:py-12">
        <div className="container mx-auto">
            <div className="flex gap-5 flex-col">
                <div className="flex">
                    <Badge variant="outline">AI-Powered Features</Badge>
                </div>

                <div className="flex gap-4 flex-col justify-left items-start">
                    <h4 className="text-2xl md:text-5xl tracking-tighter text-left font-semibold leading-tight text-black">
                        Revolutionize Your Interview Prep
                    </h4>

                    <p className="text-lg max-w-xl lg:max-w-lg leading-relaxed tracking-tight text-muted-foreground text-left">
                        Ace your interviews with our cutting-edge AI technology designed to elevate your preparation experience.
                    </p>
                </div>

                <div className="flex gap-10 pt-12 flex-col w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {features.map((feature, index) => (
                            <FeatureItem
                                key={index}
                                icon={feature.icon}
                                title={feature.title}
                                description={feature.description}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </section>
);