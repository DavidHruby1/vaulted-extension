import styles from './PromptSContainer.module.css';
import { Prompt } from '@/shared/types';
import { PromptCard } from '@components/prompts/PromptCard';

interface PromptContainerProps {
    prompts: Prompt[];
}

export const PromptsContainer = () => {
    return (
        <div className={ styles.container }>
            { prompts.length === 0 ? (
                <p>No prompts yet. Add your first!</p>
            ) : (
                prompts.map(prompt => (
                    <PromptCard key={ prompt.id } prompt={ prompt } />
                ))
            )}
        </div>
    );
}