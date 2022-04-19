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
import { FieldTitle } from '../../components/Forms/SpecialFields/FieldTitle';

const SignupSchema = yup.object().shape({
    title: yup.string().min(2, 'Нужно хотя бы два символа').max(40, 'Привышен максимум (40 символов)').required('Обязательное поле'),
    deadline: yup.date().required('Обязательное поле').nullable(),
    content: yup.string(),
    subjectId: yup.string().when("postType", {
        is: 'homework',
        then: yup.string().required('Обязательное поле'),
    }),
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
        postType: type,
        subjectId: type == 'homework' ? '2' : ''
    })


    return (
        <Formik
            initialValues={initialValues}
            validationSchema={SignupSchema}
            enableReinitialize={true}
            validateOnMount={true}
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
                    $authHost.post('/api/news/create', values).then(r => {
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
                                            <FieldTitle name="title">{TEXT.form.title}</FieldTitle>
                                            <Field
                                                name="title"
                                                className='field'
                                                maxLength={40}
                                            />
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className="field-wrapper">
                                            <FieldTitle name="deadline">{TEXT.form.deadline}</FieldTitle>
                                            <DatePickerField
                                                name="deadline"
                                                fromNow

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

