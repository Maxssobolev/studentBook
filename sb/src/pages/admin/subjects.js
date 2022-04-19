import React, { useState, useEffect } from 'react';
import { cookies } from '../../index'
import { Formik, Form, Field } from "formik"
import { Row, Col } from "react-bootstrap"
import { ListGroup } from 'react-bootstrap';
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
    const token = cookies.get('token')
    const [reload, setReload] = useState(false)
    const [subjects, setSubjects] = useState([])

    useEffect(() => {
        $authHost.get('/api/subjects').then(r => {
            let preparedData = []
            r.data.forEach(subject => {
                preparedData.push({
                    id: subject.id,
                    label: subject.title,
                    fullName: subject.fullName

                })
            })
            setSubjects(preparedData)
        })

    }, [reload])

    const handleEditSubject = (id, title, fullName) => {
        const showSuccessMessage = () => Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Успешно!',
            showConfirmButton: false,
            timer: 700
        }).then(() => {
            setReload(!reload)
        })

        Swal.fire({
            title: 'Изменить предмет?',
            html:
                `<p>Название<input id="swal-input1" class="swal2-input" value=${title}></p>` +
                `<p>Полное<input id="swal-input2" class="swal2-input" value=${fullName}></p>`,
            preConfirm: () => ({
                title: document.getElementById('swal-input1').value,
                fullName: document.getElementById('swal-input2').value,
            }),
            type: 'warning',
            showCancelButton: true,
            showDenyButton: true,
            cancelButtonColor: 'grey',
            cancelButtonText: 'Не трогать',
            confirmButtonText: 'Обновить',
            denyButtonText: `Удалить`,
        }).then(function (result) {
            const { isConfirmed, isDenied, value: { title: inputTitle, fullName: inputFullName } } = result
            if (isConfirmed) {
                $authHost.put('/api/subjects/update', {
                    id,
                    title: inputTitle,
                    fullName: inputFullName,
                }).then(r => {
                    showSuccessMessage()
                })
            }
            if (isDenied) {
                $authHost.delete(`/api/subjects/delete/${id}`).then(r => {
                    showSuccessMessage()
                })
            }
        }).catch(() => { })
    }

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

            <h4
                style={{
                    marginTop: '20px',
                    marginBottom: '15px'
                }}
            >{TEXT.form.subjects.list}</h4>

            <ListGroup dataReload={reload}>
                {subjects.map((itm) => {

                    return (

                        <ListGroup.Item key={`subjects-_${itm.id}`} onClick={() => handleEditSubject(itm.id, itm.label, itm.fullName || '')} >
                            {itm.label}
                        </ListGroup.Item>

                    )
                })}
            </ListGroup>

        </div>
    )
}

