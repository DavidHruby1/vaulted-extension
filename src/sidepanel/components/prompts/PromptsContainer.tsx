import styles from './PromptsContainer.module.css';
import type { Prompt } from '@/shared/types';
import { PromptCard } from '@components/prompts/PromptCard';
import { useState } from 'react';

interface PromptContainerProps {
    prompts: Prompt[],
    onUpdatePrompt: (id: string, updates: Partial<Prompt>) => void,
    nextTitleNumber: number;
}

export const PromptsContainer = ({ prompts, onUpdatePrompt, nextTitleNumber }: PromptContainerProps) => {
    const [editingTarget, setEditingTarget] = useState<{ id: string; field: 'title' | 'text' } | null>(null);
    const [isCurrentTargetInvalid, setIsCurrentTargetInvalid] = useState(false);

    const handleStartEditing = (id: string, field: 'title' | 'text') => {
        if (isCurrentTargetInvalid) return;
        setEditingTarget({ id, field});
    }

    const handleStopEditing = () => {
        if (isCurrentTargetInvalid) return;
        setEditingTarget(null);
    };

    const handleValidationChange = (isValid: boolean) => {
        setIsCurrentTargetInvalid(!isValid);
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
                        isTitleEditing={ editingTarget?.id === prompt.id && editingTarget?.field === 'title' }
                        isTextEditing={ editingTarget?.id === prompt.id && editingTarget?.field === 'text' }
                        onStartEditing={ handleStartEditing }
                        onStopEditing={ handleStopEditing }
                        onValidationChange={ handleValidationChange }
                    />
                ))
            )}
        </div>
    );
}