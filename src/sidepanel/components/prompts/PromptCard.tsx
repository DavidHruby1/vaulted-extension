import styles from './PromptCard.module.css';
import type { Prompt } from '@/shared/types';
import { Copy, Syringe, EllipsisVertical } from 'lucide-react';
import { PromptTitle } from '@components/prompts/PromptTitle';
import { useState, useEffect, useRef } from 'react';
import { PromptText } from './PromptText';

interface PromptCardProps {
    prompt: Prompt;
    onUpdatePrompt: (id: string, updates: Partial<Prompt>) => void,
    nextTitleNumber: number,
    isTitleEditing: boolean,
    isTextEditing: boolean,
    onStartEditing: (id: string, field: 'title' | 'text') => void,
    onStopEditing: () => void,
    onValidationChange: (isValid: boolean) => void,
    isExpanded: boolean,
    onToggleExpand: () => void;
}

export const PromptCard = ({ prompt, onUpdatePrompt, isTitleEditing, isTextEditing, onStartEditing, onStopEditing, onValidationChange, isExpanded, onToggleExpand }: PromptCardProps) => {
    const [copyStatus, setCopyStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const bodyRef = useRef<HTMLDivElement>(null);

    const handlePromptCopy = async (e: React.MouseEvent) => {
        e.stopPropagation();
        try {
            await navigator.clipboard.writeText(prompt.text);
            setCopyStatus('success');
        } catch (err) {
            console.error('Failed to copy: ', err);
            setCopyStatus('error');
        }
    };

    useEffect(() => {
        if (!isExpanded && bodyRef.current) {
            bodyRef.current.scrollTop = 0;
        }
    }, [isExpanded]);

    // useEffect hook to ensure no memory leaks because of the timer
    useEffect(() => {
        if (copyStatus === 'idle') return;

        const timerId = setTimeout(() => {
            setCopyStatus('idle');
        }, 1000);

        return () => {
            clearTimeout(timerId);
        };
    }, [copyStatus]);

    // Helper function for getting copyStatus color
    const getIconColor = () => {
        switch(copyStatus) {
            case 'success':
                return 'var(--color-success)';
            case 'error':
                return 'var(--color-error)';
            default:
                return 'white';
        }
    };

    const handleTitleChange = (newTitle: string) => {
        onUpdatePrompt(prompt.id, { title: newTitle });
        onStopEditing();
    };

    const handleTextChange = (newText: string) => {
        onUpdatePrompt(prompt.id, { text: newText });
        onStopEditing();
    };

    const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isTextEditing || isTitleEditing) return;

        const target = e.target as HTMLElement;
        if (target.closest('button') || target.closest('textarea') || target.closest('input')) {
            return;
        }

        if (!isTextEditing && !isTitleEditing) {
            onToggleExpand();
        }
    };

    return (
        <div id={ prompt.id } className={ styles.card } onClick={ handleCardClick }>
            <div className={ styles['card-header'] }>
                <div className={ styles['title-container'] }>
                    <PromptTitle
                        displayedTitle={ prompt.title }
                        onTitleChange={ handleTitleChange }
                        isEditing={ isTitleEditing }
                        onStartEditing={ () => onStartEditing(prompt.id, 'title') }
                    />
                    <span className={ styles.tokens }>{ prompt.tokenCount }</span>
                </div>

                <div className={ styles.actions }>
                    <button
                        type="button"
                        aria-label="Copy"
                        onClick={ handlePromptCopy }
                    >
                        <Copy
                            color={ getIconColor() }
                            size={24}
                            strokeWidth={2.25}
                            style={{ transition: 'color 150ms ease' }}
                        />
                    </button>
                    <button type="button" aria-label="Inject">
                        <Syringe color="white" size={24} strokeWidth={2.25} />
                    </button>
                    <button type="button" aria-label="More">
                        <EllipsisVertical color="white" size={24} strokeWidth={2.25} />
                    </button>
                </div>
            </div>

            <div ref={ bodyRef } className={`${styles['card-body']} ${isExpanded ? styles.expanded : ''}`}>
                <PromptText 
                    promptText={ prompt.text }
                    onTextChange={ handleTextChange }
                    isEditing={ isTextEditing }
                    onStartEditing={ () => onStartEditing(prompt.id, 'text') }
                    onValidationChange={ onValidationChange }
                    isExpanded={ isExpanded }
                />
            </div>
        </div>
    );
}