import styles from './PromptCard.module.css';
import type { Prompt } from '@/shared/types';
import { Copy, Syringe, EllipsisVertical } from 'lucide-react';
import { PromptTitle } from '@components/prompts/PromptTitle';

interface PromptCardProps {
    prompt: Prompt;
    onUpdatePrompt: (id: string, updates: Partial<Prompt>) => void,
    nextTitleNumber: number;
}

export const PromptCard = ({ prompt, onUpdatePrompt }: PromptCardProps) => {

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
                    <button>
                        <Copy color="white" size={24} strokeWidth={2.25} />
                    </button>
                    <button>
                        <Syringe color="white" size={24} strokeWidth={2.25} />
                    </button>
                    <button>
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