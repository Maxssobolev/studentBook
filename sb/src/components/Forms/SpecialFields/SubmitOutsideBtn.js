import { useFormikContext } from "formik";
import Button from "../../Button/Button";
import { TEXT } from '../../../config/text/text';
import isEmpty from "lodash.isempty";

export default function SubmitOutsideBtn({ ...props }) {
    const { submitForm, errors } = useFormikContext();
    return (
        <Button handler={submitForm} text={TEXT.button.post} __class='button_post' disabled={!isEmpty(errors)} />
    )
}