"use client";

import { useEffect, useState } from "react";
import {Technology} from "@/features/technologies/types/technologies";
import {getTechnologies} from "@/features/technologies/db/technologies";
import { motion } from 'framer-motion';
import {Chip} from "@/components/Chip";

export default function TechnologiesPickList() {
    const [technologies, setTechnologies] = useState<Technology[]>([]);
    const [query, setQuery] = useState<string>("");
    const [debouncedQuery, setDebouncedQuery] = useState<string>("");
    const [selectedTechnologies, setSelectedTechnologies] = useState<Technology[]>([]);

    // Debounce effect: Update `debouncedQuery` after delay
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(query);
        }, 600);

        return () => clearTimeout(handler);
    }, [query]);

    // Fetch technologies when `debouncedQuery` updates
    useEffect(() => {

        getTechnologies(debouncedQuery).then(techs => {
            setTechnologies(techs);
        });

    }, [debouncedQuery]);

    const technologiesSelected = new Set<string>();

    function addToSelectedTechnologies(technology: Technology): void {
        if (technologiesSelected.has(technology.id)) {
            return;
        }
        setSelectedTechnologies([...selectedTechnologies, technology]);
        technologiesSelected.add(technology.id);
    }

    function deleteSelectedTechnology(id: string): void {
        setSelectedTechnologies(selectedTechnologies.filter(st => st.id !== id));
        technologiesSelected.delete(id);
    }

    return (
        <div className="flex min-h-screen items-center justify-center px-6 py-12 bg-gray-500">
            <div className="sm:w-full sm:max-w-sm bg-gray-200 p-8 rounded-lg shadow-md">
                <input
                    type="text"
                    className="w-full p-2 border rounded-md"
                    placeholder="Search..."
                    onChange={(e) => setQuery(e.target.value)}
                />

                {/* Available Technologies List */}

                <ul className="mt-4">
                    {technologies.length === 0 ? (
                        <p className="text-gray-600 text-sm">No technologies found.</p>
                    ) : (
                        technologies.map((tech) => (
                            <li key={tech.id} className="p-2 border-b border-red-500 flex justify-between items-center">
                                {tech.name}
                                <button
                                    disabled={technologiesSelected.has(tech.id)}
                                    onClick={() => addToSelectedTechnologies(tech)}
                                    className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-700 transition disabled:bg-gray-400"
                                >
                                    Add
                                </button>
                            </li>
                        ))
                    )}
                </ul>

                {/* Selected Technologies List */}
                {selectedTechnologies.length > 0 && (
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold">Selected Technologies</h3>
                        <ul className="mt-2">
                            {selectedTechnologies.map((technology) => (
                                <li key={technology.id} className="p-2 flex justify-between items-center bg-gray-300 rounded-md mb-2">
                                    {technology.name}
                                    <button
                                        onClick={() => deleteSelectedTechnology(technology.id)}
                                        className="px-2 py-1 bg-gray-700 text-white rounded-md hover:bg-gray-900 transition"
                                    >
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}