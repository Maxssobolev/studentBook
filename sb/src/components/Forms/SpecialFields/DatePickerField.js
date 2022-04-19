import DatePicker from "react-datepicker";
import { useField, useFormikContext } from "formik";
import "react-datepicker/dist/react-datepicker.css";


export const DatePickerField = ({ ...props }) => {
    const { setFieldValue, setTouched, touched } = useFormikContext();
    const [field] = useField(props);
    return (
        <DatePicker
            {...field}
            {...props}
            className="field"
            selected={(field.value && new Date(field.value)) || null}
            onChange={val => {
                setFieldValue(field.name, val);

            }}
            {...(props.fromNow ? { minDate: new Date() } : null)}

            autoComplete='off'
            onBlur={() => setTouched({ ...touched, [field.name]: true })}

        />
    );
};
