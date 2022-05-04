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
                if (subject.title == 'default')
                    return

                preparedData.push({
                    id: subject.id,
                    value: subject.title,
                    label: subject.title,
                    fullName: subject.fullName

                })

            })
            setSubjects(preparedData)
        })

    }, [])

    return subjects
}

export default useSubjects