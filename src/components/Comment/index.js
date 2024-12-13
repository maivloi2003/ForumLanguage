import classNames from "classnames/bind";
import styles from './Comment.module.scss'
import Button from '~/components/Button'
import Image from '~/components/Image';
const cx = classNames.bind(styles)

function Comment({ data }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('user')}>
                <Image src={data.img_user} alt={data.name} className={cx('img')} />
                <h3 className={cx('username')}>{data.name}</h3>
                <span className={cx('datetime')}>{data.date_created}</span>
            </div>

            <div className={cx('content')}>
                <span>{data.content}</span>
            </div>

            <div className={cx('interact')}>
                <Button iconText className={cx('like')} >Like</Button>
                <Button iconText className={cx('reply')} >Reply</Button>
            </div>
        </div>
    );
}

export default Comment;