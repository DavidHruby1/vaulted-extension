import styles from './PromptCard.module.css';
import type { Prompt } from '@/shared/types';
import { Copy, Syringe, EllipsisVertical } from 'lucide-react';
import { Title } from '@components/prompts/Title';

interface PromptCardProps {
    prompt: Prompt;
}

export const PromptCard = ({ prompt }: PromptCardProps) => {
    return (
        <div className={ styles.card }>
            <div className={ styles['card-header'] }>
                <Title title={ prompt.title } maxLength={16} />
                <span>{ prompt.tokenCount }</span>
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