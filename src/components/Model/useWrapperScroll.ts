import { useContext, useEffect } from 'react';
import { useMotionValue } from 'framer-motion';

import ModelsContext from './ModelContext';

export default function useWrapperScroll() {
    const { wrapperRef } = useContext(ModelsContext);
   
    const scrollY = useMotionValue(0);
    const scrollYProgress = useMotionValue(0);

    useEffect(() => {
        const element = wrapperRef.current;

        if (element) {
            const updateScrollVallue = () => {                
                const { scrollTop, scrollHeight, offsetHeight } = element;

                const fullScroll = scrollHeight - offsetHeight;

                scrollY.set(scrollTop); //number, quantidade de pixels
                scrollYProgress.set(scrollTop / fullScroll); //0 a 1 (%) (progresso fez na página)
                
            }
            element.addEventListener('scroll', updateScrollVallue);
                
            return () => element.removeEventListener('scroll', updateScrollVallue);
        }  

    }, [scrollY, scrollYProgress, wrapperRef]);

    return { scrollY, scrollYProgress };
};