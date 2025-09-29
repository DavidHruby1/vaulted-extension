import { useState, useEffect, useRef } from 'react';
import styles from './PromptText.module.css';

interface PromptTextProps {
    promptText: string;
    onTextChange: (newText: string) => void,
    isEditing: boolean,
    onStartEditing: () => void,
    onValidationChange: (isValid: boolean) => void;
}

export const PromptText = ({ promptText, onTextChange, isEditing, onStartEditing, onValidationChange }: PromptTextProps) => {
    const [text, setText] = useState(promptText);
    const [hasError, setHasError] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

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
                    className={styles['prompt-text']}
                    onDoubleClick={ onStartEditing }
                >
                    { text }
                </p>
            )}
        </>
    );
};