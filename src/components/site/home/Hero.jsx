// import React from "react";

export const Hero = () => (
    <section className="mx-auto flex max-w-[980px] flex-col items-center gap-6 md:py-12 md:pb-8 lg:py-28 lg:pb-12">
        <div className="transform-none mb-5">
            <a className="group inline-flex items-center rounded-lg border border-black/10 bg-transparent px-3 py-1 text-sm font-medium text-neutral-800 shadow-sm" target="_blank" rel="noreferrer" href="https://afrotech.devpost.com/">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-blocks h-4 w-4 group-hover:rotate-6 group-hover:fill-cyan-300"><rect width="7" height="7" x="14" y="3" rx="1"></rect><path d="M10 21V8a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H3"></path></svg>

                <div data-orientation="vertical" role="none" className="shrink-0 w-[1px] mx-2 h-4 bg-neutral-900">
                </div>

                <span>Built for the AfroTech Hackathon!</span>

                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-1 h-4 w-4">
                    <path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd">
                    </path>
                </svg>
            </a>
        </div>

        <div className="transform-none mb-3">
            <h3 className="text-center text-xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
                <span className="tracking-tight pb-3 bg-clip-text text-blue-600 text-4xl sm:text-5xl lg:text-6xl font-bold">
                    Ace The Interview, Get The Job
                </span>
            </h3>
        </div>

        <div className="flex flex-wrap items-center justify-center text-center text-base text-lg text-slate-600 font-normal leading-6">
            <span className="px-32">Upload your resume and target job details, engage in tailored AI-powered mock interviews, and receive instant personalized insights to stand out in your next opportunity.</span>
        </div>


        <div className="transform-none">
            <div className="flex w-full items-center justify-center space-x-4 py-4 md:pb-2">
                <a className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-md font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-600 text-primary-foreground hover:bg-blue-600/90 px-5 py-3" href="/auth">Get Prepped!</a>
            </div>
        </div>
    </section>
);