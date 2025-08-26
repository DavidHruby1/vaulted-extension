import styles from './SearchBar.module.css';

export const SearchBar = () => {
    return (
        <input 
            type="text" 
            className={ styles['search-bar'] } 
            placeholder="Search here..." 
            aria-label="Search prompts"
        />
    )
}