import { SearchBar } from '../search/SearchBar';
import styles from './Layout.module.css';
import { AddPromptButton } from '@components/footer/AddPromptButton';
import { FilterContainer } from '@components/filters/FilterContainer';
import { FilterChipsContainer } from '@components/chips/FilterChipsContainer';
import { PromptsContainer } from '@/sidepanel/components/prompts/PromptsContainer';
import type { Prompt } from '@/shared/types';

interface LayoutProps {
    prompts: Prompt[];
    onAddClick: () => void,
    onUpdatePrompt: (id: string, updates: Partial<Prompt>) => void,
    nextTitleNumber: number;
}

export const Layout = ({ prompts, onAddClick, onUpdatePrompt, nextTitleNumber }: LayoutProps) => {
    return (
        <div className={ styles.container }>
            <div className={ styles.header }>
                <SearchBar />
                <FilterContainer />
                <FilterChipsContainer />
            </div>

            <div className={ styles.content }>
                <PromptsContainer
                    prompts={ prompts }
                    onUpdatePrompt={ onUpdatePrompt }
                    nextTitleNumber={ nextTitleNumber }
                />
            </div>

            <div className={ styles.footer }>
                <AddPromptButton onAddClick={ onAddClick } />
            </div> 
        </div>
    )
}