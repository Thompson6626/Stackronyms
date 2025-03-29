import { AnimatePresence, motion } from "framer-motion";

type Props = {
    text: string;
    clickDelete: () => void;
};

// Acronyms to be rendered
export const AcronymPart = ({ text, clickDelete }: Props) => {
    const letters = text.slice(1).split("");
    const delayPerLetter = 0.04;

    return (
        <motion.div
            layout // Enable smooth reordering animation
            exit={{ opacity: 0, scale: 0.5 , x: 300 }} // Smoothly shrink and fade
            transition={{ duration: 0.3, ease: "easeInOut" }}
        >
            <div 
            className="border-none flex items-baseline gap-2 px-4 pb-3 rounded-lg cursor-pointer text-black"
             onClick={clickDelete}
             >
    <motion.span
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 15 }}
        className="font-bold text-cyan-500 text-[max(3rem,4vw)] leading-none -mb-1"
    >
        {text[0]}
    </motion.span>

    <motion.span className="font-bold flex text-[max(2rem, 3vw)] text-black leading-none">
        <AnimatePresence>
            {letters.map((char, index) => (
                <motion.span
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{
                        type: "spring",
                        duration: 0.2,
                        delay: index * delayPerLetter,
                    }}
                >
                    {char}
                </motion.span>
            ))}
        </AnimatePresence>
    </motion.span>
</div>

        </motion.div>
    );
};
