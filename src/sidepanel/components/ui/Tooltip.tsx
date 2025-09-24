import styles from './Tooltip.module.css';

interface TooltipProps {
    tooltipText: string;
}

export const Tooltip = ({ tooltipText }: TooltipProps) =>{
    return (
        <div className={ styles['tooltip-container'] }>
            <span className={ styles['tooltip-text'] }>{ tooltipText }</span>
        </div>
    )
}