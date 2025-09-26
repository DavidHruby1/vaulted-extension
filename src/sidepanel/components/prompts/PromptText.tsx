import { useState, useEffect, useRef } from 'react';
import styles from './PromptText.module.css';

interface PromptTextProps {
    promptText: string;
    onTextChange: (newText: string) => void;
}

export const PromptText = ({ promptText, onTextChange }: PromptTextProps) => {
    const [text, setText] = useState(promptText);
    const [isEditing, setIsEditing] = useState(false);
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

            /*textarea.style.height = 'auto';
            const newHeight = Math.min(textarea.scrollHeight, 200);
            textarea.style.height = `${newHeight}px`;*/
        }
    }, [isEditing, text]);

    return (
        <>
            {isEditing ? (
                <textarea
                    ref={ textareaRef }
                    className={ styles['text-area'] }
                    value={ text }
                    onChange={(e) => setText(e.target.value)}
                    onBlur={ () => {
                        onTextChange(text);
                        setIsEditing(false);
                    }}
                    onKeyDown={ (e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            onTextChange(text);
                            setIsEditing(false);
                        }
                    }}
                    spellCheck={ false }
                    autoFocus
                />
            ) : (
                <p
                    className={styles['prompt-text']}
                    onDoubleClick={ (e) => {
                        e.preventDefault;
                        setIsEditing(true); 
                    }}
                >
                    { text }
                </p>
            )}
        </>
    );
};