export default function SubjectCardMobile({ start, end, name, link, now, isPlaceholder = false }) {
    if (isPlaceholder) {
        return (
            <div className={`subjectCard subjectCard_placeholder`}>
                <div>
                    На сегодня занятий нет
                </div>
            </div>
        )
    }
    return (
        <div className={`subjectCard ${now ? 'subjectCard_now' : ''}`}>
            <div className="subjectCard__time">
                <div className="subjectCard__time_from">{start}</div>
                {/*<div className="subjectCard__time_to">{end}</div>*/}
            </div>
            <div className="subjectCard__name">{name}</div>
        </div>
    )
}