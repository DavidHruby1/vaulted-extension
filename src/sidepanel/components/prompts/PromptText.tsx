import { useState, useEffect, useRef } from 'react';
import styles from './PromptText.module.css';

interface PromptTextProps {
    promptText: string;
    onTextChange: (newText: string) => void;
}

export const PromptText = ({ promptText, onTextChange }: PromptTextProps) => {
    const [text, setText] = useState(promptText);
    const [isEditing, setIsEditing] = useState(false);
    const [hasError, setHasError] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (!isEditing) {
            setText(promptText);
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

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            
            if (text.length === 0) {
                setHasError(true);
            } else {
                setHasError(false);
                onTextChange(text);
                setIsEditing(false);
            }
        }
    };

    const handleOnBlur = () => {
        if (text.trim().length === 0) {
            setHasError(true);
        } else {
            onTextChange(text);
            setIsEditing(false);
            setHasError(false);
        }
    };

    return (
        <>
            {isEditing ? (
                <textarea
                    ref={ textareaRef }
                    className={`${styles['text-area']} ${hasError ? styles['error-border'] : ''}`}
                    value={ text }
                    onChange={(e) => {
                        setHasError(false);
                        setText(e.target.value);
                    }}
                    onBlur={ handleOnBlur }
                    onKeyDown={ handleKeyDown }
                    spellCheck={ false }
                    autoFocus
                />
            ) : (
                <p
                    className={styles['prompt-text']}
                    onDoubleClick={ () => setIsEditing(true) }
                >
                    { text }
                </p>
            )}
        </>
    );
};