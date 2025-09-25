import styles from './PromptCard.module.css';
import type { Prompt } from '@/shared/types';
import { Copy, Syringe, EllipsisVertical } from 'lucide-react';
import { PromptTitle } from '@components/prompts/PromptTitle';
import { useState } from 'react';

interface PromptCardProps {
    prompt: Prompt;
    onUpdatePrompt: (id: string, updates: Partial<Prompt>) => void,
    nextTitleNumber: number;
}

export const PromptCard = ({ prompt, onUpdatePrompt }: PromptCardProps) => {
    const [copyStatus, setCopyStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handlePromptCopy = async () => {
        try {
            await navigator.clipboard.writeText(prompt.text);
            setCopyStatus('success');
        } catch (err) {
            console.error('Failed to copy: ', err);
            setCopyStatus('error');
        }
    };

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
    };

    return (
        <div className={ styles.card }>
            <div className={ styles['card-header'] }>
                <div className={ styles['title-container'] }>
                    <PromptTitle
                        displayedTitle={ prompt.title }
                        onTitleChange={ handleTitleChange }
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

            <div className={ styles['card-body'] }>
                <p className={ styles['card-text'] }>
                    { prompt.text }
                </p>
            </div>
        </div>
    );
}