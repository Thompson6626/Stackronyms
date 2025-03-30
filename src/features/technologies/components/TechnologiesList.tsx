"use client";

import React, { useEffect, useState, useCallback, useMemo, useDeferredValue } from "react";
import { Technology } from "@/features/technologies/types/technologies";
import { Chip } from "@/components/Chip/Chip";
import { AcronymPart } from "@/components/Acronym/AcronymPart";
import { AnimatePresence, motion } from "framer-motion";
import technologiesData from "../../../../data/technologies.json";

export default function TechnologiesPickList() {
    const [query, setQuery] = useState("");
    const deferredQuery = useDeferredValue(query);

    const [technologies, setTechnologies] = useState<Technology[]>(technologiesData);
    const [selectedTechnologies, setSelectedTechnologies] = useState<Technology[]>([]);
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

    useEffect(() => {
        setTechnologies(technologiesData.filter(
            (tech) => tech.name.toLowerCase().startsWith(deferredQuery.toLowerCase())
        ));
    }, [deferredQuery]);

    const addToSelectedTechnologies = useCallback((technology: Technology) => {
        if (selectedIds.has(technology.id)) return;
        setSelectedTechnologies((prev) => [...prev, technology]);
        setSelectedIds((prev) => new Set(prev).add(technology.id));
    }, [selectedIds]);

    const deleteSelectedTechnology = useCallback((id: string) => {
        setSelectedTechnologies((prev) => prev.filter((st) => st.id !== id));
        setSelectedIds((prev) => {
            const newSet = new Set(prev);
            newSet.delete(id);
            return newSet;
        });
    }, []);

    const resetSelectedTechnologies = useCallback(() => {
        setSelectedTechnologies([]);
        setSelectedIds(new Set());
    }, []);

    const selectedTechNames = useMemo(() =>
            selectedTechnologies.map((tech) => tech.name).join("\n"),
        [selectedTechnologies]
    );

    const [copied, setCopied] = useState(false);

    const copyToClipboard = useCallback(() => {
        navigator.clipboard.writeText(selectedTechNames).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        });
    }, [selectedTechNames]);

    return (
        <div className="flex gap-2 mt-16">
            <div className="flex flex-col items-center max-w-1/2 w-1/2 h-screen">
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
                <div className="p-5 pb-5">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
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

            <div className="w-1/2 p-16 mr-10 flex flex-col justify-start items-start">
                <div className="flex justify-between w-full mb-15">
                    <AnimatePresence>
                        {selectedTechnologies.length > 0 && (
                            <>
                                <AnimatedButton
                                    className="relative px-4 py-2 bg-white text-black border border-black rounded-md hover:bg-gray-200 transition"
                                    onClick={copyToClipboard}
                                >
                                    Copy
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
                                    Reset
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
}
