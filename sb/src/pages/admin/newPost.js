import React, { useState, useEffect } from 'react';
import { cookies } from '../../index'
import { Formik, Form, Field, useFormikContext } from "formik"
import { Row, Col } from "react-bootstrap"
import isEmpty from 'lodash.isempty'
import useQuery from '../../components/Hooks/useQuery';
import * as yup from 'yup'
import SubmitOutsideBtn from '../../components/Forms/SpecialFields/SubmitOutsideBtn';
import { TEXT } from '../../config/text/text';
import { DatePickerField } from '../../components/Forms/SpecialFields/DatePickerField';
import useSubjects from '../../components/Hooks/useSubjects'
const SignupSchema = yup.object().shape({
    courseTitle: yup.string().min(3, 'Too Short!').max(200, 'Too Long!').required('Required'),
});

//for add or uopdate post
export default function NewPost() {
    const query = useQuery();
    const token = cookies.get('token')

    const subjects = useSubjects()
    const type = query.get('type')

    const [initialValues, setInitialValues] = useState({
        title: '',
        deadline: '',
        content: '',
        postType: type,
        subjectId: ''
    })


    return (
        <Formik
            initialValues={initialValues}
            //validationSchema={SignupSchema}
            enableReinitialize={true}
            onSubmit={(values, { resetForm }) => {
                console.log(values)
            }}
        >
            {
                ({ values, errors, touched, setSubmitting }) => (
                    <>
                        <div className="page page-admin page-admin__newPost">
                            <Form>
                                <Row>
                                    <Col>
                                        <div className="field-wrapper">
                                            <span>{TEXT.form.title}</span>
                                            <Field
                                                className='field'
                                                name="title"
                                            />
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className="field-wrapper">
                                            <span>{TEXT.form.deadline}</span>
                                            <DatePickerField
                                                name="deadline"
                                            />
                                        </div>
                                    </Col>
                                </Row>

                            </Form>
                        </div>
                        <div className="rightsidebar">
                            <div className="submit-btn">
                                <SubmitOutsideBtn />
                            </div>
                        </div>
                    </>
                )
            }
        </Formik>
    )
}

