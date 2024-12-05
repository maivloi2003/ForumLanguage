import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { useState } from "react";

import styles from './Post.module.scss'
import Image from "~/components/Image";
import Button from "~/components/Button";
import { faEllipsisVertical, faHeart as faHeartSolid, faShare } from "@fortawesome/free-solid-svg-icons";
import { faComment, faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { likeService } from "~/apiServices";
import packageInfo from '../../../package.json'

const cx = classNames.bind(styles)

function Post({ data, profile = false }) {
    const [showLike, setShowLike] = useState(data.user_like || false);
    const [likesCount, setLikesCount] = useState(data.likes || 0);

    const handleToggleLike = async () => {
        const token = localStorage.getItem('authToken')
        if (!token) {
            alert('Login is required to like posts.');
            return;
        }
        const res = await likeService(data.id, !showLike, token);
        if (res?.result) {
            setShowLike(res.result.liked);
            setLikesCount((prev) => (res.result.liked ? prev + 1 : Math.max(0, prev - 1)));
        } else {
            console.log(res);
        }
    }

    const handleShare = () => {
        const homePage = `${packageInfo.homepage}post/${data.id}`
        navigator.clipboard.writeText(homePage)
        alert(homePage)
    }

    const renderContent = () => {
        return data.content?.split('\n').map((item, index) => (
            <span key={index}>
                {item}
                <br />
            </span>
        ));
    };

    return (
        <div className={cx('wrapper', { profile })}>
            <div className={cx('header')}>
                <div className={cx('user')}>
                    <Link to={`/ForumLanguage/users/${data.id_user}`} >
                        <Image className={cx('avatar')} src={data.img_user} />
                    </Link>
                    <Link className={cx('name')} to={`/ForumLanguage/users/${data.id_user}`}>{data.name}</Link>
                    <Link className={cx('date')} to={`/ForumLanguage/post/${data.id}`}>{data.date_created}</Link>
                    <Link className={cx('language')} to={`/ForumLanguage/post/${data.id}`}>{data.language}</Link>

                </div>
                <div className={cx('more-btn')}>
                    <Button iconText leftIcon={faEllipsisVertical} />
                </div>
            </div>
            <div className={cx('title')}>
                <Link className={cx('text-title')} to={`/ForumLanguage/post/${data.id}`}>{data.title}</Link>
            </div>
            <div className={cx('content')}>
                <Link className={cx('text-content')} to={`/ForumLanguage/post/${data.id}`}>
                    {renderContent()}
                </Link>
            </div>
            {data.img && (
                <div className={cx('img')}>
                    <Link to={`/ForumLanguage/post/${data.id}`} className={cx('img-link')}>
                        <Image src={data.img} className={cx('img-src')} />
                    </Link>
                </div>
            )}
            <div className={cx('interact')}>
                <div className={cx('like')}>
                    <Button
                        like={showLike}
                        onClick={handleToggleLike}
                        className={cx('like-btn')}
                        round
                        normal
                        rightIcon={showLike ? faHeartSolid : faHeartRegular}
                    >
                        {likesCount}
                    </Button>
                </div>
                <div className={cx('comment')}>
                    <Button
                        to={`/ForumLanguage/post/${data.id}`}
                        className={cx('comment-btn')}
                        round
                        normal
                        rightIcon={faComment}
                    >
                        {`${data.comments || 0}`}
                    </Button>
                </div>
                <div className={cx('share')}>
                    <Button onClick={handleShare} className={cx('share-btn')} round normal rightIcon={faShare} />
                </div>
            </div>
        </div>
    );
}

export default Post;