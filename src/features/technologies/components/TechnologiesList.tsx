"use client";

import { useEffect, useState } from "react";
import { Technology } from "@/features/technologies/types/technologies";
import { getTechnologies } from "@/features/technologies/db/technologies";
import { Chip } from "@/components/Chip/Chip";
import { AcronymPart } from "@/components/Acronym/AcronymPart";
import {AnimatePresence, motion} from "framer-motion";

export default function TechnologiesPickList() {
    const [query, setQuery] = useState<string>("");
    const [technologies, setTechnologies] = useState<Technology[]>([]);
    const [selectedTechnologies, setSelectedTechnologies] = useState<Technology[]>([]);
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

    useEffect(() => {
        handleSearch();
    }, []);

    function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>): void {
        if (event.key === "Enter") {
            handleSearch();
        }
    }

    function handleSearch(): void {
        getTechnologies(query).then((techs) => setTechnologies(techs));
    }


    function addToSelectedTechnologies(technology: Technology): void {
        if (selectedIds.has(technology.id)) return;
        setSelectedTechnologies((prev) => [...prev, technology]);
        setSelectedIds((prev) => new Set(prev).add(technology.id));
    }

    function deleteSelectedTechnology(id: string): void {
        setSelectedTechnologies((prev) => prev.filter((st) => st.id !== id));
        setSelectedIds((prev) => {
            const newSet = new Set(prev);
            newSet.delete(id);
            return newSet;
        });
    }

    function resetSelectedTechnologies(): void{
        setSelectedTechnologies(() => []);
        setSelectedIds(() => new Set());
    }

    const [copied, setCopied] = useState(false);

    function copyToClipboard(): void {
        const toClip = selectedTechnologies.map((technology) => technology.name).join("\n");

        navigator.clipboard.writeText(toClip).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        });
    }

    return (
        <div className="flex gap-2 mt-16">

            {/* Info Icon with Tooltip */}
            <div className="absolute top-0 left-0 p-4 group">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6 text-gray-700 cursor-pointer group-hover:text-blue-500 transition-all"
                >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12" y2="8"></line>
                </svg>
                <span className="mt-2 absolute left-10 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    Technologies I got from AI
                </span>
            </div>
            {/* Search text field */}
            <div className="flex flex-col items-center  max-w-1/2 w-1/2 h-screen">
                {/* Make it bigger */}
                <div className="p-5 pb-5">
                    <input
                        type="text"
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        value={query}
                        placeholder="Search technologies..."
                        className="px-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="w-3/4 flex flex-wrap gap-3 overflow-y-auto scroll-smooth p-4 group hover:overflow-y-auto">
                    {technologies.map((technology) => (
                        <Chip
                            text={technology.name}
                            clickAdd={() => addToSelectedTechnologies(technology)}
                            key={technology.id}
                        />
                    ))}
                </div>
            </div>

            <div className="w-1/2 p-16 flex flex-col justify-start items-start">
                {/* Remove All Button */}
                <div className="flex justify-between w-full mb-15">
                    <AnimatePresence>
                        {selectedTechnologies.length > 0 && (
                            <>
                                <AnimatedButton
                                    className="relative px-4 py-2 bg-white text-black border border-black rounded-md hover:bg-gray-200 transition"
                                    onClick={copyToClipboard}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
                                    </svg>

                                    {/* Copy signal */}
                                    {copied && (
                                        <motion.span
                                            initial={{ opacity: 0, y: -5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -5 }}
                                            className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded-md"
                                        >
                                            Copied!
                                        </motion.span>
                                    )}
                                </AnimatedButton>

                                <AnimatedButton onClick={resetSelectedTechnologies} className="self-end mb-4 px-4 py-2 bg-red-500 text-white rounded-xl shadow-md hover:bg-red-600 transition-all flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                                        <path d="M3 6h18"></path>
                                        <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                        <path d="M10 11v6"></path>
                                        <path d="M14 11v6"></path>
                                        <path d="M5 6h14l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6z"></path>
                                    </svg>
                                </AnimatedButton>
                            </>
                        )}
                    </AnimatePresence>
                </div>

                <AnimatePresence>
                    {selectedTechnologies.map((technology) => (
                        <AcronymPart
                            key={technology.id}
                            text={technology.name}
                            clickDelete={() => deleteSelectedTechnology(technology.id)}
                        />
                    ))}
                </AnimatePresence>
            </div>

        </div>
    );
}

type ButtonPros = {
    onClick: () => void;
    className?: string;
    children?: React.ReactNode;
}

function AnimatedButton({ onClick, className, children }: ButtonPros){
    return <motion.button
        onClick={onClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.8 }}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
        className={className}
    >
        {children}
    </motion.button>
};
