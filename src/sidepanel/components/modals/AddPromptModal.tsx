import { useState, FormEvent } from 'react';
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
        });
    ));
};

export const AddPromptModal = ({ isOpen, onClose, onAddPrompt }: PromptModalProps) => {
    const [title, setTitle] = useState('');
    const [tagInput, setTagInput] = useState('');
    const [text, setText] = useState('');

    if (!isOpen) return null;

    handleAddPrompt = (e: FormEvent) => {
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
        <div className={ styles.overlay }>
            <div className={ styles.modal }>
                <button className={ styles['close-modal-btn'] onClick={ onClose }}>
                    <X size={16} />
                </button> 
            </div>
        </div>
    );