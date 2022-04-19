import React, { useState, useEffect } from 'react';
import { cookies } from '../../index'
import { Formik, Form, Field } from "formik"
import { Row, Col } from "react-bootstrap"
import isEmpty from 'lodash.isempty'
import useQuery from '../../components/Hooks/useQuery';
import * as yup from 'yup'
import SubmitOutsideBtn from '../../components/Forms/SpecialFields/SubmitOutsideBtn';
import { TEXT } from '../../config/text/text';
import { DatePickerField } from '../../components/Forms/SpecialFields/DatePickerField';
import useSubjects from '../../components/Hooks/useSubjects'
import TextEditor from '../../components/Forms/SpecialFields/TextEditor';
import { $authHost } from '../../http';
import Swal from 'sweetalert2'

const SignupSchema = yup.object().shape({
    courseTitle: yup.string().min(3, 'Too Short!').max(200, 'Too Long!').required('Required'),
});

//for add or uopdate post
export default function NewPost() {
    const query = useQuery();
    const token = cookies.get('token')

    const subjects = useSubjects({ subjectsOnly: true })
    const type = query.get('type')

    const [initialValues, setInitialValues] = useState({
        title: '',
        deadline: '',
        content: '',
        subjectId: type == 'homework' ? '2' : null
    })


    return (
        <Formik
            initialValues={initialValues}
            //validationSchema={SignupSchema}
            enableReinitialize={true}
            onSubmit={(values, { resetForm }) => {
                if (type == 'homework') {
                    $authHost.post('/api/homeworks/create', values).then(r => {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Успешно!',
                            showConfirmButton: false,
                            timer: 1500
                        }).then(() => {
                            resetForm({ values: '' })
                        })
                    })
                }
                else {

                }
            }}
        >
            {
                ({ values, errors }) => (
                    <>
                        <div className="page page-admin page-admin__newPost">
                            <Form className='form form-newPost'>
                                <Row>
                                    <Col>
                                        <div className="field-wrapper">
                                            <span>{TEXT.form.title}</span>
                                            <Field
                                                name="title"
                                                className='field'
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
                                {type == 'homework' &&
                                    <Row>
                                        <div className="two-columns-wrapper radio" >
                                            {subjects.map((itm) => {

                                                return (

                                                    <Col key={`subjects-_${itm.id}`}>
                                                        <label style={{
                                                            display: 'flex',
                                                            cursor: 'pointer'

                                                        }}>
                                                            <Field

                                                                type="radio"
                                                                name="subjectId"
                                                                value={itm.id.toString()}
                                                            />
                                                            <span>{itm.label}</span>
                                                        </label>
                                                    </Col>

                                                )
                                            })}
                                        </div>
                                    </Row>
                                }
                                <Row>
                                    <Col>
                                        <div className="field-wrapper">

                                            <TextEditor
                                                name='content'
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

