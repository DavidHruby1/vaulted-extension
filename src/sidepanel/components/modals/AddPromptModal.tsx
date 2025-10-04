import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import styles from './AddPromptModal.module.css';
import { X } from 'lucide-react';
import { formatTags } from '@/shared/utils/formatTags';

interface PromptModalProps {
    isOpen: boolean,
    onClose: () => void,
    onAddPrompt: (data: { title: string, tags: string[], text: string}) => void;
}

export const AddPromptModal = ({ isOpen, onClose, onAddPrompt }: PromptModalProps) => {
    const [title, setTitle] = useState('');
    const [tagInput, setTagInput] = useState('');
    const [text, setText] = useState('');
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setTitle('');
            setTagInput('');
            setText('');
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setHasError(false);

        const tags = formatTags(
            tagInput
                .split(/[,\s]+/)
                .map(t => t.trim())
                .filter(Boolean)
        );

        // If someone deletes 'required' in DevTools
        if (text.trim().length === 0) {
            setHasError(true);
            return;
        } 

        // Calls the function that adds the prompt to the PromptsContainer - passed from the parent
        onAddPrompt( {title, tags, text} );

        setTitle('');
        setTagInput('');
        setText('');

        onClose();
    };

    return (
        <div className={ styles.overlay } onClick={ onClose }>
            <div className={ styles.modal } onClick={ (e) => e.stopPropagation() }>
                <button className={ styles['close-modal-btn'] } onClick={ onClose }>
                    <X size={16} strokeWidth={3} />
                </button> 

                <form className={ styles['add-prompt-form'] } onSubmit={ handleSubmit }>
                    <label className={ styles['add-prompt-label'] }>
                        Title
                        <input
                            className={ styles['add-prompt-input'] }
                            type="text"
                            value={ title }
                            onChange={ (e) => setTitle(e.target.value.slice(0, 60)) }
                            maxLength={60}
                            autoFocus
                        />
                    </label>

                    <label className={ styles['add-prompt-label'] }>
                        Tag
                        <input 
                            className={ styles['add-prompt-input'] }
                            type="text"
                            value={ tagInput }
                            onChange={ (e) => setTagInput(e.target.value.slice(0, 40)) }
                            maxLength={40}
                        />
                    </label>

                    <textarea
                        className={`${styles['add-prompt-textarea']} ${hasError ? styles['error-border'] : ''}`}
                        rows={6}
                        value={ text }
                        onChange={ (e) => setText(e.target.value.slice(0, 999999)) }
                        placeholder='Enter your prompt here...'
                        required
                        maxLength={999999}
                    />

                    <button type="submit" className={ styles['submit-btn'] }>
                        <span className={ styles['submit-text'] }>Submit</span>
                    </button>
                </form>
            </div>
        </div>
    );
};