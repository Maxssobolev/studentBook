//custom react-select styles
export const customSelectStyles = {
    control: styles => ({
        ...styles,
        cursor: 'pointer',
        backgroundColor: 'transparent',
        border: 'none',
        outline: 'none',
        borderRadius: '0px',
        boxShadow: 'none',
        minWidth: '100%',
        height: '1rem',
        color: '#5b3dea',
        '&:hover': {
            borderColor: ''
        }

    }),
    valueContainer: styles => ({
        ...styles,
        padding: '0px',
        fontWeight: 500
    }),
    indicatorSeparator: styles => ({
        ...styles,
        backgroundColor: 'transparent',
    }),
    placeholder: styles => ({
        ...styles,
        color: 'var(--radio-color)',
    }),
    singleValue: styles => ({
        ...styles,
        color: 'var(--radio-color)',
    }),
    menu: styles => ({
        ...styles,
        width: '100%',
        right: 0
    }),
};
