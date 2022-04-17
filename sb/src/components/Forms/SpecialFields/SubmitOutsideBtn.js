import { useFormikContext } from "formik";
import Button from "../../Button/Button";
import { TEXT } from '../../../config/text/text';

export default function SubmitOutsideBtn({ ...props }) {
    const { submitForm } = useFormikContext();
    return (
        <Button handler={submitForm} text={TEXT.button.post} __class='button_post' />
    )
}