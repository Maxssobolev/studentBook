import moment from 'moment'

//возвращает оставшееся время до дедлайна или false, если дедлайн просрочен
export function getRemainTime(deadline) {
    let remain_time = '';
    if (moment(deadline).isAfter(moment())) {
        let remain_actual_time = moment(deadline).diff(moment(), 'hours');
        remain_time =
            Math.floor(remain_actual_time / 24) > 0
                ? Math.floor(remain_actual_time / 24) +
                'д ' +
                (remain_actual_time - 24 * Math.floor(remain_actual_time / 24)) +
                'ч'
                : remain_actual_time - 24 * Math.floor(remain_actual_time / 24) + 'ч';
    }
    return remain_time = remain_time ? `Актуально еще ${remain_time}` : `Событие закончилось ${moment(deadline).format('D MMMM, HH:mm')}`;
}

export function getRemainDeadline(publishDate, deadline) {
    let wholeRopeWidth = '';
    let progress = '';
    let fromStartToNow = '';
    let remainTime = '';

    let publicDate = moment(publishDate);
    let pubicDate_startPoint = moment(publishDate);

    if (deadline !== '0000-00-00') {
        deadline = moment(deadline);
        wholeRopeWidth = deadline.diff(publicDate, 'hours');
        fromStartToNow = moment().diff(pubicDate_startPoint, 'hours');
        progress = Math.round((fromStartToNow / wholeRopeWidth) * 100);
    }
    if (moment(deadline).isAfter(moment())) {
        let remain_actual_time = moment(deadline).diff(moment(), 'hours');
        remainTime =
            Math.floor(remain_actual_time / 24) > 0
                ? Math.floor(remain_actual_time / 24) +
                'д ' +
                (remain_actual_time - 24 * Math.floor(remain_actual_time / 24)) +
                'ч'
                : remain_actual_time - 24 * Math.floor(remain_actual_time / 24) + 'ч';
    }
    return { remainTime, progress }
}