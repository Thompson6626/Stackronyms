
import { motion } from 'framer-motion';

// Acronyms to be rendered
// Enchance the first letter
export const AcronymPart = (
    { text }:
    { text:string }
) => {
    return (
        <div>
            <motion.span>
                {text[0]}
            </motion.span>
            <motion.span>
                {text.slice(1)}
            </motion.span>
        </div>
    );
};