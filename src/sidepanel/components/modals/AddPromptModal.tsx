//import { useState } from 'react';
//import type { FormEvent } from 'react';
import styles from './AddPromptModal.module.css';
import { X } from 'lucide-react';

interface PromptModalProps {
    isOpen: boolean,
    onClose: () => void,
    onAddPrompt: (data: { title: string, tags: string[], text: string}) => void;
}

const formatTags = (tags: string[]): string[] => {
    return Array.from(new Set(
        tags.map(tag => {
            const cleanTag = tag.startsWith('#') ? tag.slice(1) : tag;

            if (cleanTag.charAt(0) === cleanTag.charAt(0).toUpperCase()) {
                return `#${cleanTag}`; // Already formatted correctly
            }
            
            return `#${cleanTag.charAt(0).toUpperCase() + cleanTag.slice(1)}`;
        })
    ));
};

export const AddPromptModal = ({ isOpen, onClose, onAddPrompt }: PromptModalProps) => {
    const [title, setTitle] = useState('');
    const [tagInput, setTagInput] = useState('');
    const [text, setText] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const tags = formatTags(
            tagInput
                .split(/[,\s]+/)
                .map(t => t.trim())
                .filter(Boolean)
        );

        // Calls the function that adds the prompt to the PromptsContainer - passed from the parent
        onAddPrompt( {title, tags, text} );

        setTitle('');
        setTagInput('');
        setText('');

        onClose();
    };

    return (
        <div className={ styles.overlay } onClick={ onClose }>
            <div className={ styles.modal } onClick={ e => e.stopPropagation() }>
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
                            onChange={ e => setTitle(e.target.value) }
                        />
                    </label>

                    <label className={ styles['add-prompt-label'] }>
                        Tag
                        <input 
                            className={ styles['add-prompt-input'] }
                            type="text"
                            value={ tagInput }
                            onChange={ e => setTitle(e.target.value) }
                        />
                    </label>

                    <textarea
                        className={ styles['add-prompt-textarea'] }
                        rows={6}
                        value={ text }
                        onChange={ e => setText(e.target.value) }
                        placeholder='Enter your prompt here...'
                        required
                    />

                    <button type="submit" className={ styles['submit-btn'] }>
                        <span className={ styles['submit-text'] }>Submit</span>
                    </button>
                </form>
            </div>
        </div>
    );
};