import classNames from "classnames/bind";
import { Link } from "react-router-dom";

import styles from './Post.module.scss'
import Image from "~/components/Image";
import Button from "~/components/Button";
import { faEllipsisVertical, faShare } from "@fortawesome/free-solid-svg-icons";
import packageInfo from '../../../package.json'
import { faComment, faHeart } from "@fortawesome/free-regular-svg-icons";

const cx = classNames.bind(styles)

function Post({ data, profile = false }) {

    return (
        <div className={cx('wrapper', { profile })}>
            <div className={cx('header')}>
                <div className={cx('user')}>
                    <Link to={`/users/${data.id_user}`} >
                        <Image className={cx('avatar')} src={data.img_user} />
                    </Link>
                    <Link className={cx('name')} to={`/users/${data.id_user}`}>{data.name}</Link>
                    <Link className={cx('date')} to={`/post/${data.id}`}>{data.date_created}</Link>
                    <Link className={cx('language')} to={`/post/${data.id}`}>{data.language}</Link>

                </div>
                <div className={cx('more-btn')}>
                    <Button iconText leftIcon={faEllipsisVertical} />
                </div>
            </div>
            <div className={cx('title')}>
                <Link className={cx('text-title')} to={`/post/${data.id}`}>{data.title}</Link>
            </div>
            <div className={cx('content')}>
                <Link className={cx('text-content')} to={`/post/${data.id}`}>{data.content?.split('\n').map((item, index) => (
                    <span key={index}>
                        {item}
                        <br />
                    </span>
                ))}</Link>
            </div>
            {data.img && (
                <div className={cx('img')}>
                    <Link to={`/post/${data.id}`} className={cx('img-link')}>
                        <Image src={data.img} className={cx('img-src')} />
                    </Link>
                </div>
            )}
            <div className={cx('interact')}>
                <div className={cx('like')}>
                    <Button className={cx('like-btn')} round normal rightIcon={faHeart}><span>{data.likes}</span></Button>
                </div>
                <div className={cx('comment')}>
                    <Button className={cx('comment-btn')} round normal rightIcon={faComment}><span>{data.comments}</span></Button>
                </div>
                <div className={cx('share')}>
                    <Button className={cx('share-btn')} round normal rightIcon={faShare} />
                </div>
            </div>
        </div>
    );
}

export default Post;