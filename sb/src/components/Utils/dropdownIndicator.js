import { ReactComponent as CustomArrow } from '../../assets/img/arrow-down.svg'
import { components } from 'react-select';

export const DropdownIndicator = props => {
    return (
        components.DropdownIndicator && (
            <components.DropdownIndicator {...props}>
                {props.selectProps.menuIsOpen ? <CustomArrow width={8} style={{ transform: 'rotate(180deg)', marginRight: '5px' }} fill='var(--radio-color)' /> : <CustomArrow width={8} fill='var(--radio-color)' style={{ marginRight: '5px' }} />}
            </components.DropdownIndicator>
        )
    );
}