"use client";
import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
import { z } from 'zod';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { PaperclipIcon, FileTextIcon, MessageSquareIcon, UploadIcon } from "lucide-react";

// Zod schemas
const jobInfoSchema = z.object({
    roleName: z.string().min(1, "Role name is required"),
    description: z.string().min(1, "Job description is required"),
});

const resumeSchema = z.instanceof(File)
    .refine((file) => file.size <= 5 * 1024 * 1024, "File size should be less than 5MB");

export default function OnboardingFlow() {
    const [step, setStep] = useState(1);
    const [jobInfo, setJobInfo] = useState({
        roleName: '',
        description: '',
    });
    const [resume, setResume] = useState(null);
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        validateStep();
    }, [step, jobInfo, resume]);

    const validateStep = () => {
        let stepErrors = {};
        let stepIsValid = true;

        if (step === 1) {
            stepIsValid = true; // No validation needed for step 1
        } else if (step === 2) {
            try {
                jobInfoSchema.parse(jobInfo);
            } catch (error) {
                stepErrors = error.errors.reduce((acc, curr) => {
                    acc[curr.path[0]] = curr.message;
                    return acc;
                }, {});
                stepIsValid = false;
            }
        } else if (step === 3) {
            try {
                resumeSchema.parse(resume);
            } catch (error) {
                stepErrors.resume = error.errors[0].message;
                stepIsValid = false;
            }
        }

        setErrors(stepErrors);
        setIsValid(stepIsValid);
    };

    const handleContinue = () => {
        if (isValid) {
            if (step < 3) {
                setStep(step + 1);
            } else {
                submitData();
            }
        }
    };

    const handleJobInfoChange = (e) => {
        const { name, value } = e.target;
        setJobInfo(prev => ({ ...prev, [name]: value }));
    };

    const handleResumeUpload = (e) => {
        const file = e.target.files[0];
        setResume(file);
    };

    const submitData = async () => {
        // Prepare the data to be submitted
        const formData = new FormData();
        formData.append('roleName', jobInfo.roleName);
        formData.append('description', jobInfo.description);
        formData.append('resume', resume);

        try {
            // Replace '/api/submit-onboarding' with your actual API endpoint
            const response = await fetch('/api/submit-onboarding', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                // Handle successful submission
                console.log('Data submitted successfully');
                // You might want to redirect the user or show a success message
            } else {
                // Handle submission error
                console.error('Submission failed');
                // You might want to show an error message to the user
            }
        } catch (error) {
            console.error('Error submitting data:', error);
            // Handle network errors or other exceptions
        }
    };

    const renderStep1 = () => (
        <>
            <div className="w-full max-w-md mx-auto">
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

                <Button onClick={handleContinue} className="w-full bg-blue-600 hover:bg-blue-700 text-white" size="lg">
                    Continue
                </Button>
            </div>
        </>
    );

    const renderStep2 = () => (
        <>
            <div className="mb-6 space-y-3">
                <h2 className="text-2xl font-bold text-center">
                    Tell us about the job
                </h2>

                <p className="text-center">This will help us tailor your interview practice to the job.</p>
            </div>

            <div className="space-y-6">
                <div>
                    <Label htmlFor="roleName">Name of the role</Label>
                    <Input
                        id="roleName"
                        name="roleName"
                        value={jobInfo.roleName}
                        onChange={handleJobInfoChange}
                        placeholder="e.g. Software Engineer"
                        className="w-full mt-1"
                    />
                </div>

                {/* <RadioGroup
                    value={jobInfo.inputType}
                    onValueChange={(value) => setJobInfo(prev => ({ ...prev, inputType: value }))}
                    className="space-y-2"
                >
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="link" id="link" />
                        <Label htmlFor="link">Paste link to the role</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="description" id="description" />
                        <Label htmlFor="description">Paste job description</Label>
                    </div>
                </RadioGroup> */}

                {/* {jobInfo.inputType === 'link' ? (
                    <Input
                        name="linkOrDescription"
                        value={jobInfo.linkOrDescription}
                        onChange={handleJobInfoChange}
                        placeholder="https://example.com/job-posting"
                        className="w-full mt-1"
                    />
                ) : ( */}
                <div>
                    <Label htmlFor="description">Job description</Label>
                    <Textarea
                        name="linkOrDescription"
                        value={jobInfo.linkOrDescription}
                        onChange={handleJobInfoChange}
                        placeholder="Paste the job description here..."
                        className="w-full mt-1"
                        rows={10}
                    />
                </div>
                {/* )} */}
            </div>

            <Button onClick={handleContinue} className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white" size="lg">
                Continue
            </Button>
        </>
    );

    const renderStep3 = () => (
        <>
            <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
                Upload your resume
            </h2>

            <div className="space-y-6">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <label htmlFor="resume-upload" className="mt-2 cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        Select File
                    </label>
                    <input
                        id="resume-upload"
                        type="file"
                        className="hidden"
                        accept=".pdf,.doc,.docx"
                        onChange={handleResumeUpload}
                    />
                    <p className="mt-1 text-sm text-gray-600">or drag and drop</p>
                    <p className="text-xs text-gray-500">(PDF, DOC, DOCX up to 5MB)</p>
                </div>
                {resume && (
                    <p className="text-sm text-green-600">File selected: {resume.name}</p>
                )}
            </div>

            <Button onClick={handleContinue} className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white" size="lg">
                Continue
            </Button>
        </>
    );

    return (
        <div className="flex align-center justify-center min-h-screen bg-white pt-20 pb-0">
            <div className="w-full max-w-md mx-auto">
                {step === 1 && renderStep1()}
                {step === 2 && renderStep2()}
                {step === 3 && renderStep3()}
            </div>
        </div>
    );
}