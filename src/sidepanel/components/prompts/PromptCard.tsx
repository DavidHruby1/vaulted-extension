import styles from './PromptCard.module.css';
import type { Prompt } from '@/shared/types';
import { Copy, Syringe, EllipsisVertical } from 'lucide-react';

interface PromptCardProps {
    prompt: Prompt;
}

export const PromptCard = ({ prompt }: PromptCardProps) => {
    return (
        <div className={ styles.card }>
            <div className={ styles['card-header'] }>
                <h3>{ prompt.title }</h3>
                <span>{ prompt.tokenCount }</span>
                <div className={ styles.actions }>
                    <button>
                        <Copy size={32} strokeWidth={3} />
                    </button>
                    <button>
                        <Syringe size={32} strokeWidth={3} />
                    </button>
                    <button>
                        <EllipsisVertical size={32} strokeWidth={3} />
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