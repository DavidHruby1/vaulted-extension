import { SearchBar } from '../search/SearchBar';
import styles from './Layout.module.css';
import { AddPromptButton } from '@components/footer/AddPromptButton';
import { FilterContainer } from '@components/filters/FilterContainer';
import { FilterChipsContainer } from '@components/chips/FilterChipsContainer';

export const Layout = () => {
    return (
        <div className={ styles.container }>
            <div className={ styles.header }>
                <SearchBar />
                <FilterContainer />
                <FilterChipsContainer />
            </div>

            <div className={ styles.content }>
                {/* The PromptCards go here */}                  
            </div>

            <div className={ styles.footer }>
                <AddPromptButton />
            </div> 
        </div>
    )
}