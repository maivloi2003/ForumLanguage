import { useEffect } from 'react';

const useScroll = (contentRef, callback) => {
    useEffect(() => {
        const handleScroll = () => {
            if (contentRef.current) {
                const { scrollTop, clientHeight, scrollHeight } = contentRef.current;
                if ((scrollTop + clientHeight) >= scrollHeight) {
                    callback()
                }
            }
        }

        const contentElement = contentRef.current;
        if (contentElement) {
            contentElement.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (contentElement) {
                contentElement.removeEventListener('scroll', handleScroll);
            }
        };
    }, [contentRef, callback])
}
export default useScroll;