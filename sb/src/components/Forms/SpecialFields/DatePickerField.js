import DatePicker, { registerLocale } from "react-datepicker";
import ru from "date-fns/locale/ru";
import { useField, useFormikContext } from "formik";
import "react-datepicker/dist/react-datepicker.css";

registerLocale('ru', ru);

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
            dateFormat="dd.MM.yyyy HH:mm"
            locale="ru"
            calendarStartDay={1}
            showTimeSelect
        />
    );
};
