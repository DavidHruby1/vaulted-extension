import styles from './PromptCard.module.css';
import type { Prompt } from '@/shared/types';
import { Copy, Syringe, EllipsisVertical } from 'lucide-react';
import { PromptTitle } from '@components/prompts/PromptTitle';
import { useState } from 'react';
import { Tooltip } from '@components/ui/Tooltip';

interface PromptCardProps {
    prompt: Prompt;
    onUpdatePrompt: (id: string, updates: Partial<Prompt>) => void,
    nextTitleNumber: number;
}

export const PromptCard = ({ prompt, onUpdatePrompt }: PromptCardProps) => {
    const [isCopied, setIsCopied] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handlePromptCopy = async () => {
        try {
            await navigator.clipboard.writeText(prompt.text);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
            setError('Copy failed')
            setTimeout(() => setError(null), 2000);
        }
    }

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
                        <Copy color="white" size={24} strokeWidth={2.25} />
                        { isCopied && <Tooltip tooltipText="Copied" />}
                        { error && <Tooltip tooltipText={ error } />}
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