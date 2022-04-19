import { useState, useEffect } from 'react'
import { $host } from '../../http'
function useSubjects({ subjectsOnly = false }) {

    const [subjects, setSubjects] = useState([])
    useEffect(() => {
        $host.get('/api/subjects').then(r => {
            let preparedData = []

            if (!subjectsOnly) {
                preparedData.push({ id: 0, label: 'Все предметы', value: 'all' })
            }

            r.data.forEach(subject => {
                preparedData.push({
                    id: subject.id,
                    value: subject.title,
                    label: subject.title,

                })
            })
            setSubjects(preparedData)
        })

    }, [])

    return subjects
}

export default useSubjects