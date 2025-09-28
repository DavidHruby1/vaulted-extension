import styles from './PromptSContainer.module.css';
import type { Prompt } from '@/shared/types';
import { PromptCard } from '@components/prompts/PromptCard';
import { useState } from 'react';

interface PromptContainerProps {
    prompts: Prompt[],
    onUpdatePrompt: (id: string, updates: Partial<Prompt>) => void,
    nextTitleNumber: number;
}

export const PromptsContainer = ({ prompts, onUpdatePrompt, nextTitleNumber }: PromptContainerProps) => {
    const [editingPromptId, setEditingPromptId] = useState<string | null>(null);

    const handleStartEditing = (id: string) => {
        if (!editingPromptId) setEditingPromptId(id);
    }

    const handleStopEditing = () => {
        setEditingPromptId(null);
    };

    return (
        <div className={ styles.container }>
            { prompts.length === 0 ? (
                <p>No prompts yet. Add your first!</p>
            ) : (
                prompts.map(prompt => (
                    <PromptCard
                        key={ prompt.id }
                        prompt={ prompt }
                        onUpdatePrompt={ onUpdatePrompt }
                        nextTitleNumber={ nextTitleNumber }    
                        isEditing={ editingPromptId === prompt.id }
                        onStartEditing={ handleStartEditing }
                        onStopEditing={ handleStopEditing }
                    />
                ))
            )}
        </div>
    );
}