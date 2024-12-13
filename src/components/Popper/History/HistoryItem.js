import classNames from 'classnames/bind';
import styles from './History.module.scss';
import { Link } from "react-router-dom";
import Image from "~/components/Image";

const cx = classNames.bind(styles);

function HistoryItem({ data, avatar }) {



    return (
        <Link to={`/post/${data.idPost}`} className={cx('history-item')}>
            <Image src={avatar} className={cx('avatar')} />
            <div className={cx('message')}>
                <div className={cx('content')}>{data.message}</div>
                <div className={cx('createdTime')}>{data.date_created}</div>
            </div>
        </Link>
    );
}

export default HistoryItem;