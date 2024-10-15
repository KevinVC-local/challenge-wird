import { useMemo } from 'react';
import { IconContext } from 'react-icons';

interface CustomizableButtonProps {
    onClick: (event?: React.MouseEvent<HTMLButtonElement>) => void;
    label: string;
    color?: string;
    backgroundColor?: string;
    borderRadius?: string;
    fontSize?: string;
    fontWeight?: string;
    isDisabled?: boolean;
    icon?: JSX.Element;
}

const ButtonCustom: React.FC<CustomizableButtonProps> = ({
    onClick,
    label,
    color = '#1B5E20',
    backgroundColor = '#26A69A',
    fontWeight = 'bold',
    borderRadius = '24px',
    fontSize = '12px',
    isDisabled = false,
    icon
}) => {

    const handleClick = () => {
        if (!isDisabled) {
            onClick();
        }
    };

    const buttonStyle = {
        color: color,
        backgroundColor: backgroundColor,
        borderRadius: borderRadius,
        fontSize: fontSize,
        fontWeight,
        padding: '10px 16px',
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        border: 'none',
        outline: 'none',
        display: 'flex',
        alignItems: 'center',
    };

    const iconContextValue = useMemo(() => ({ size: '1em', style: { marginRight: '10px' } }), []);

    return (
        <button style={buttonStyle} onClick={handleClick} disabled={isDisabled}>
            {icon && (
                <IconContext.Provider value={iconContextValue}>
                    {icon}
                </IconContext.Provider>
            )}
            {label}
        </button>
    )
}



export default ButtonCustom