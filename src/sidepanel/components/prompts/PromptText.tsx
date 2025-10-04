import { useState, useEffect, useRef } from 'react';
import styles from './PromptText.module.css';

interface PromptTextProps {
    promptText: string;
    onTextChange: (newText: string) => void,
    isEditing: boolean,
    onStartEditing: () => void,
    onValidationChange: (isValid: boolean) => void,
    isExpanded: boolean;
}

export const PromptText = ({ promptText, onTextChange, isEditing, onStartEditing, onValidationChange, isExpanded }: PromptTextProps) => {
    const [text, setText] = useState(promptText);
    const [hasError, setHasError] = useState(false);
    const [isOverflowing, setIsOverflowing] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const pRef = useRef<HTMLParagraphElement>(null);
    const spanRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (!isEditing) {
            setText(promptText);
            setHasError(false);
            onValidationChange(true);
        }
    }, [promptText, isEditing]);

    useEffect(() => {
        if (isEditing && textareaRef.current) {
            const textarea = textareaRef.current;
            textarea.focus();
            
            const length = textarea.value.length;
            textarea.setSelectionRange(length, length);

            textarea.scrollTop = textarea.scrollHeight;
            
            textarea.style.height = 'auto';
            textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
        }
    }, [isEditing, text]);

    useEffect(() => {
        const pElement = pRef.current;
        const spanElement = spanRef.current;
        if (!pElement || !spanElement) return;

        const checkOverflow = () => {
            const hasOverflow = spanElement.scrollHeight > pElement.clientHeight + 1;
            setIsOverflowing(hasOverflow);
        };
        
        const animationFrameId = requestAnimationFrame(checkOverflow);

        const handleResize = () => {
            requestAnimationFrame(checkOverflow);
        };
        
        window.addEventListener("resize", handleResize);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener("resize", handleResize);
        };
    }, [text, isExpanded]);

    // Help function for handling text update
    const handleTextUpdate = (newText: string) => {
        const isValid = newText.trim().length > 0;
        setHasError(!isValid);
        onValidationChange(isValid);
        
        if (isValid) {
            onTextChange(newText);
        } else {
            textareaRef.current?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleTextUpdate(text);    
        }
    };

    const handleOnBlur = () => {
        handleTextUpdate(text);
    };

    const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newText = e.target.value;
        setText(newText);
        const isValid = newText.trim().length > 0;
        setHasError(!isValid);
        onValidationChange(isValid);
    }

    return (
        <>
            {isEditing ? (
                <textarea
                    ref={ textareaRef }
                    className={`${styles['text-area']} ${hasError ? styles['error-border'] : ''}`}
                    value={ text }
                    onChange={ handleOnChange }
                    onBlur={ handleOnBlur }
                    onKeyDown={ handleKeyDown }
                    spellCheck={ false }
                    autoFocus
                />
            ) : (
                <p
                    ref={pRef}
                    className={`
                        ${styles['prompt-text']}
                        ${ isOverflowing && !isExpanded ? styles.overflowing : ''}
                        ${isExpanded ? styles.expanded : ''}
                    `}
                    onDoubleClick={ onStartEditing }
                >
                    <span ref={ spanRef }>{ text }</span>
                </p>
            )}
        </>
    );
};