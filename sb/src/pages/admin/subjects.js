import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from "formik"
import { Row, Col } from "react-bootstrap"
import * as yup from 'yup'
import SubmitOutsideBtn from '../../components/Forms/SpecialFields/SubmitOutsideBtn';
import { TEXT } from '../../config/text/text';
import { $authHost } from '../../http';
import Swal from 'sweetalert2'
import { FieldTitle } from '../../components/Forms/SpecialFields/FieldTitle';

const SignupSchema = yup.object().shape({
    title: yup.string().min(2, 'Нужно хотя бы два символа').max(40, 'Привышен максимум (40 символов)').required('Обязательное поле'),
    fullName: yup.string().min(2, 'Нужно хотя бы два символа').nullable(),

});


export default function Subjects() {
    const [reload, setReload] = useState(false)
    const [subjects, setSubjects] = useState([])

    useEffect(() => {
        $authHost.get('/api/subjects').then(r => {
            let preparedData = []
            r.data.forEach(subject => {
                if (subject.title == 'default')
                    return
                preparedData.push({
                    id: subject.id,
                    label: subject.title,
                    fullName: subject.fullName

                })
            })
            setSubjects(preparedData)
        })

    }, [reload])



    return (
        <div className="page page-admin page-admin__subjects">
            <Formik
                initialValues={{
                    title: '',
                    fullName: ''
                }}
                validationSchema={SignupSchema}
                enableReinitialize={true}
                validateOnMount={true}
                onSubmit={(values, { resetForm }) => {

                    $authHost.post('/api/subjects/create', values).then(r => {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Успешно!',
                            showConfirmButton: false,
                            timer: 700
                        }).then(() => {
                            resetForm({ values: '' })
                            setReload(!reload)
                        })
                    })


                }}
            >
                {
                    ({ values, errors }) => (
                        <Form className='form form-subjects'>
                            <Row>
                                <Col>
                                    <div className="field-wrapper">
                                        <FieldTitle name="title">{TEXT.form.subjects.title}</FieldTitle>
                                        <Field
                                            required
                                            name="title"
                                            className='field'
                                            maxLength={40}
                                        />
                                    </div>
                                </Col>
                                <Col>
                                    <div className="field-wrapper">
                                        <FieldTitle name="fullName">{TEXT.form.subjects.fullName}</FieldTitle>
                                        <Field
                                            name="fullName"
                                            className='field'
                                        />
                                    </div>
                                </Col>
                            </Row>
                            <SubmitOutsideBtn />
                        </Form>
                    )
                }
            </Formik>

        </div>
    )
}

