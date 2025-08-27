import styles from './FilterButton.module.css';

interface FilterButtonProps {
    text: string,
    bgColor?: string,
    icon?: React.ComponentType<{ size?: number, color?: string }>
    // onClick
}

export const FilterButton = ({ text, bgColor="var(--filter-btn-bg)", icon: Icon }: FilterButtonProps) => {
    return (
        <button
            className={ styles['filter-btn'] }
            style={{ backgroundColor: bgColor }}
        >
            { Icon && <Icon size={16} color="var(--neutral-dark)" /> }
            <span className={ styles.text }>{ text }</span>
        </button>
    );
}