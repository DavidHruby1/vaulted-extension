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
                <div className={ styles['title-container'] }>
                    <h3>{ prompt.title }</h3>
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