"use client";
import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PaperclipIcon, FileTextIcon, MessageSquareIcon, Loader } from "lucide-react";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import FileUpload from '@/components/site/panel/FileUpload';
import { useRouter } from 'next/navigation'

// Zod schemas
const jobInfoSchema = z.object({
    roleName: z.string().min(2, "The role name is required"),
    description: z.string().min(2, "The job description is required"),
});

const resumeSchema = z.object({
    resume: z
        .custom((value) => value instanceof File, "Please upload a file")
        .refine(
            (file) => file && file.size <= 5 * 1024 * 1024,
            "Your resume should be 5MB or less"
        )
        .refine(
            (file) => {
                if (!file) return false;
                const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
                return validTypes.includes(file.type);
            },
            "Please upload a PDF, DOC, or DOCX file"
        )
});

export default function OnboardingFlow() {
    const [step, setStep] = useState(1);
    const [jobInfo, setJobInfo] = useState(null);
    const [resume, setResume] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const jobInfoForm = useForm({
        resolver: zodResolver(jobInfoSchema),
        defaultValues: {
            roleName: '',
            description: '',
        },
    })

    const onJobInfoSubmit = (data) => {
        console.log(data);
        setJobInfo(data);
        setStep(3);
    }

    const handleFileUpload = (file) => {
        if (!file) {
            setError("Please select or drop your resume to upload");
            setResume(null);
            return;
        }

        try {
            resumeSchema.parse({ resume: file });
            setResume(file);
            setError(null);
        } catch (error) {
            setError(error.errors[0]?.message || "Invalid file type selected");
            setResume(null);
        }
    };

    const onResumeSubmit = async (event) => {
        event.preventDefault();
        
        if (resume) {
            setIsLoading(true);

            try {
                resumeSchema.parse({ resume });
                await submitData();
            } catch (error) {
                setIsLoading(true);
                setError(error.errors[0].message);
            }
        } else {
            setIsLoading(false);
            setError("Please upload your resume");
        }
    };

    const submitData = async () => {
        console.log('Submitting data...');
        const formData = new FormData();
        formData.append('roleName', jobInfo.roleName);
        formData.append('description', jobInfo.description);
        formData.append('resume', resume);

        try {
            const response = await fetch('/api/firstprep', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();

            if (response.ok) {
                setIsLoading(false);
                console.log('Data submitted successfully', result);
                router.push('/firstprep/practice/');
            } else {
                console.error('Submission failed', result);
                setIsLoading(false);
            }
        } catch (error) {
            console.error('Error submitting data:', error);
            setIsLoading(false);
            // Handle error (e.g., show error message to user)
        }
    };


    const renderStep1 = () => (
        <>
            <div className="w-full max-w-md mx-auto mt-44">
                <div className="mb-6 space-y-3">
                    <h2 className="text-2xl font-bold text-center">
                        Welcome to Prepwell!
                    </h2>

                    <p className="text-center">Get ahead in securing your dream job with quality interview practice. But first, here's how Prepwell works:</p>
                </div>

                <div className="space-y-6 mb-8">
                    <div className="flex items-center p-2">
                        <PaperclipIcon className="h-6 w-6 text-blue-500 mr-5" />

                        <div>
                            <h3 className="font-semibold">Provide job details</h3>
                            <p className="text-sm text-gray-600">Paste a link or the description of the position you are applying for</p>
                        </div>
                    </div>


                    <div className="flex items-center px-2">
                        <FileTextIcon className="h-6 w-6 text-blue-500 mr-5" />

                        <div>
                            <h3 className="font-semibold">Add resume</h3>
                            <p className="text-sm text-gray-600">Upload the resume you used in applying for the role</p>
                        </div>
                    </div>


                    <div className="flex items-center px-2">
                        <MessageSquareIcon className="h-6 w-6 text-blue-500 mr-5" />
                        <div>
                            <h3 className="font-semibold">Interview practice</h3>
                            <p className="text-sm text-gray-600">Practice interview questions with and receive feedback</p>
                        </div>
                    </div>
                </div>

                <Button onClick={() => setStep(2)} className="w-full bg-blue-600 hover:bg-blue-700 text-white" size="lg">
                    Continue
                </Button>
            </div>
        </>
    );

    const renderStep2 = () => (
        <>
            <div className="w-full max-w-md mx-auto mt-36">
                <div className="mb-6 space-y-3">
                    <h2 className="text-2xl font-bold text-center">
                        Tell us about the job
                    </h2>

                    <p className="text-center">This will help us tailor your interview practice to the job.</p>
                </div>

                <Form {...jobInfoForm}>
                    <form onSubmit={jobInfoForm.handleSubmit(onJobInfoSubmit)} className="space-y-6">
                        <FormField
                            control={jobInfoForm.control}
                            name="roleName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name of the role</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="roleName"
                                            placeholder="e.g. Software Engineer"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={jobInfoForm.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Job description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            id="description"
                                            placeholder="Paste the job description here..."
                                            {...field}
                                            rows={10}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white" size="lg">
                            Continue
                        </Button>
                    </form>
                </Form>
            </div>
        </>
    );

    const renderStep3 = () => (
        <>
            <div className="w-full max-w-md mx-auto mt-44">
                <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
                    Upload your resume
                </h2>

                <form onSubmit={onResumeSubmit} className="space-y-6">
                    <FileUpload
                        mode="vertical"
                        uploadMode="single"
                        defaultText="Upload your resume"
                        otherText="(PDF, DOC, DOCX up to 5MB)"
                        onFilesUploaded={handleFileUpload}
                        zodSchema={resumeSchema}
                        errors={error}
                    />

                    <Button
                        type="submit"
                        className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white" size="lg"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <Loader className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            'Start Prepping'
                        )}
                    </Button>
                </form>
            </div>
        </>
    );

    return (
        <div className="flex align-center justify-center min-h-screen bg-white py-0">
            <div className="w-full max-w-md mx-auto">
                {step === 1 && renderStep1()}
                {step === 2 && renderStep2()}
                {step === 3 && renderStep3()}
            </div>
        </div>
    );
}