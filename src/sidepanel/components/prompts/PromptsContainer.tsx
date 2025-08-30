import styles from './PromptSContainer.module.css';
import { Prompt } from '@/shared/types';
import { PromptCard } from '@components/prompts/PromptCard';

interface PromptContainerProps {
    prompts: Prompt[];
}

export const PromptsContainer = () => {
    return (
        <div className={ styles.container }>
            {/* The PromptCards go here */}
        </div>
    );
}