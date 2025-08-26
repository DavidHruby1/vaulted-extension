import styles from './SearchBar.module.css';

export const SearchBar = () => {
    return (
        <div className={ styles.container }>
            <input 
                type="text" 
                className={ styles['search-bar'] } 
                placeholder="Search here..." 
            />
        </div>
    )
}