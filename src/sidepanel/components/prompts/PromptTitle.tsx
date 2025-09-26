import { useState, useEffect, useRef } from 'react';
import styles from './PromptTitle.module.css'

interface PromptTitleProps {
    displayedTitle: string,
    onTitleChange: (newTitle: string) => void;
}

export const PromptTitle = ({ displayedTitle, onTitleChange }: PromptTitleProps) => {
    const [text, setText] = useState(displayedTitle);
    const [isTooLong, setIsTooLong] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const debounceRef = useRef<number | null>(null);

    useEffect(() => {
        if (!isEditing) {
            setText(displayedTitle);
        }
    }, [displayedTitle, isEditing]);

    useEffect(() => {
        const promptTitle = titleRef.current;
        if (!promptTitle) return;

        const checkOverflow = () => {
            const isOverflowing = promptTitle.scrollWidth > promptTitle.clientWidth;
            setIsTooLong(isOverflowing);
        }

        checkOverflow();

        const handleResize = () => {
            if (debounceRef.current) clearTimeout(debounceRef.current);
            debounceRef.current = window.setTimeout(checkOverflow, 200);
        }
        
        window.addEventListener("resize", handleResize);

        return () => {
            if (debounceRef.current) clearTimeout(debounceRef.current);
            window.removeEventListener("resize", handleResize);
        };
    }, [displayedTitle]);

    return (
        <>
            { isEditing ? (
                <input
                    className={ styles['title-input'] }
                    type="text"
                    value={ text }
                    onChange={ (e) => setText(e.target.value.slice(0, 60)) }
                    onBlur={ () => {
                        onTitleChange(text.trim());
                        setIsEditing(false);
                    }}
                    onKeyDown={ (e) => {
                        if (e.key === 'Enter') {
                            onTitleChange(text.trim());
                            setIsEditing(false);
                        }
                    }}
                    spellCheck={ false }
                    autoFocus
                />
            ) : (
                <h3
                    className={ styles['prompt-title'] }
                    ref={ titleRef }
                    title={ isTooLong ? displayedTitle : '' }
                    onDoubleClick={ () => setIsEditing(true) }
                >
                    { text }
                </h3>
            )}
        </>
    );
}