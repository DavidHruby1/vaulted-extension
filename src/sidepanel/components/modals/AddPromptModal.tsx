import { useState, FormEvent } from 'react';
import styles from './AddPromptModal.module.css';
import { hash } from 'crypto';

interface PromptModalProps {
    isOpen: boolean,
    onClose: () => void,
    onAddPrompt: (data: { title: string, tags: string[], text: string}) => void;
}

const formatTags = (tags: string[]): string[] => {
    return tags.map(tag => {
        const hashTag = tag.startsWith('#') ? tag : `#${tag}`;

        if (hashTag.charAt(1) === hashTag.charAt(1).toUpperCase()) {
            return hashTag; // Already formatted correctly
        }
        
        const formattedTag = hashTag.charAt(1).toUpperCase() + hashTag.slice(2);
        return formattedTag;
    });
}

export const AddPromptModal = ({ isOpen, onClose, onAddPrompt }: PromptModalProps) => {
    const [title, setTitle] = useState('');
    const [tagInput, setTagInput] = useState('');
    const [text, setText] = useState('');

    handleAddPrompt = (e: FormEvent) => {
        e.preventDefault();
        const tags = formatTags(tagInput.split(/[,\s]+/).filter(Boolean));
}