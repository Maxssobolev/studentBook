import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useFormikContext, useField } from 'formik'
export default function TextEditor({ ...props }) {
    const { setFieldValue, setTouched, touched } = useFormikContext();
    const [field] = useField(props);
    return (
        <CKEditor
            editor={ClassicEditor}
            {...field}
            {...props}

            value={field.value}
            onChange={(event, editor) => {
                setFieldValue(field.name, editor.getData());
            }}
            onBlur={() => setTouched({ ...touched, [field.name]: true })}
            config={
                {

                    ckfinder: {
                        uploadUrl: `${process.env.REACT_APP_API_URL}/api/uploads/image`,

                    }
                }
            }

        />
    )
}
