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
    const [inputWidth, setInputWidth] = useState('auto');
    const titleRef = useRef<HTMLHeadingElement>(null);
    const debounceRef = useRef<number | null>(null);
    const measurerRef = useRef<HTMLSpanElement>(null);

    // Synchronize with props
    useEffect(() => {
        setText(displayedTitle);
    }, [displayedTitle]);

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

    useEffect(() => {
        if (isEditing && measurerRef.current) {
            setInputWidth(`${measurerRef.current.offsetWidth}px`);
        }
    }, [isEditing, text]);

    const finishEditing = () => {
        onTitleChange(text.trim());
        setIsEditing(false);
    };

    const handleTitleEdit = () => setIsEditing(!isEditing);

    const handleBlur = () => finishEditing();

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") finishEditing();
    };

    return (
        <>
            { isEditing && (
                <span ref={measurerRef} className={styles['text-measurer']}>
                    {text}
                </span>
            )}
            { isEditing ? (
                <input
                    className={ styles['title-input'] }
                    type="text"
                    value={ text }
                    onChange={ (e) => setText(e.target.value) }
                    onBlur={ handleBlur }
                    onKeyDown={ handleKeyDown }
                    autoFocus
                    style={{ width: inputWidth }}
                />
            ) : (
                <h3
                    className={ styles['prompt-title'] }
                    ref={ titleRef }
                    title={ isTooLong ? displayedTitle : '' }
                    onDoubleClick={ handleTitleEdit }
                >
                    { text }
                </h3>
            )}
        </>
    );
}