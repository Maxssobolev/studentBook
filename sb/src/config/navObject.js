//icons
import { ReactComponent as MainIcon } from '../assets/img/side-menu/main.svg'
import { ReactComponent as HomeWorkIcon } from '../assets/img/side-menu/hw.svg'
import { ReactComponent as SubjectsIcon } from '../assets/img/side-menu/subjects.svg'
import { ReactComponent as PeopleIcon } from '../assets/img/side-menu/people.svg'


export const nav = [
    {
        title: 'Главная сраница',
        icon: MainIcon,
        link: '/main',
        disabled: false
    },
    {
        title: 'Домашнее задание',
        icon: HomeWorkIcon,
        link: '/homework',
        disabled: false
    },
    {
        title: 'Предметы',
        icon: SubjectsIcon,
        link: '/subjects',
        disabled: true
    },
    {
        title: 'Разное',
        icon: PeopleIcon,
        link: '/other',
        disabled: true
    },

]