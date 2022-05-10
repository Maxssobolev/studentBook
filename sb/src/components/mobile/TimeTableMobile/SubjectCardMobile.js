export default function SubjectCardMobile({ start, end, name, link, now }) {

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