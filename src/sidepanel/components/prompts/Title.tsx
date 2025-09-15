import styles from './Title.module.css';

interface TitleProps {
    title: string,
    maxLength: number;
}

export const Title = ({ title, maxLength }: TitleProps) => {
    const isTooLong: boolean = title.length > maxLength;

    const displayedTitle = isTooLong
        ? `${title.slice(0, maxLength + 1)}...`
        : title;

    const wrapperClasses = `
        ${styles['title-container']}${!isTooLong ? styles.hidden : ''}
    `;

    return (
        <div className={ wrapperClasses }>
            <h3>{ displayedTitle }</h3>
        </div>
    );
}