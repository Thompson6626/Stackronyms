import { motion } from 'framer-motion';
import styles from './styles.module.css';

// Chips for the technology names
export function Chip(
    { text, clickAdd }:
    { text: string, clickAdd:() => void }
) {

    return (
        <motion.div
            whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.90 }}
            className={`${styles.button} rounded-lg text-lg bg-gray-500 text-white px-4 py-2 cursor-pointer shadow-md hover:bg-gray-800`}
            onClick={clickAdd}
        >
            {text}
        </motion.div>
    );
}