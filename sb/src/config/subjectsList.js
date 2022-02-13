import ProgramIcon from '../assets/img/subjects-icons/programming.svg'
import MMTIcon from '../assets/img/subjects-icons/mmt.svg'
import PravoIcon from '../assets/img/subjects-icons/pravo.svg'


export const subjects = [
    { label: 'Все предметы', value: 'all', id: 0 },
    { label: 'Программирование', value: 'programming', id: 1 },
    { label: 'ММТ', value: 'mmt', id: 2 },
    { label: 'Правоведение', value: 'pravo', id: 3 },
    { label: 'Экономика', value: 'economica', id: 4 },
    { label: 'Прикладной дизайн', value: 'pr.design', id: 5 },
    { label: 'Иностр. яз.', value: 'in.yas', id: 6 },
    { label: 'Физ-ра', value: 'pe', id: 7 },
    { label: 'ИО и МО', value: 'io.mo', id: 8 },
    { label: 'ИС и Т', value: 'is.t', id: 9 },
    { label: 'Учебная практика', value: 'practica', id: 10 },
]


export const getSubject = (id) => {
    let res = ''
    subjects.forEach((itm) => {
        if (itm.id === id) {
            res = itm
        }
    })
    return res
} 