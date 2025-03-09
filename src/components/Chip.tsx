
import { motion } from 'framer-motion';

// Chips for the technology names
export function Chip(
    { text }:
    { text: string }
) {
    return (
        <div>
            {text}
        </div>
    );
}