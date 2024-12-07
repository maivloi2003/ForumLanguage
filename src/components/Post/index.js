import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { Fragment, useState } from "react";

import styles from './Post.module.scss'
import Image from "~/components/Image";
import Button from "~/components/Button";
import { faEllipsisVertical, faHeart as faHeartSolid, faEyeSlash, faBookmark, faPen, faShare, faTrash, faFlag, faClose } from "@fortawesome/free-solid-svg-icons";
import { faComment, faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { deletedPostService, likeService } from "~/apiServices";
import packageInfo from '../../../package.json'
import Menu from "~/components/Popper/Menu";

const cx = classNames.bind(styles)

function Post({ data, profile = false }) {
    const [showLike, setShowLike] = useState(data.user_like || false);
    const [showModal, setShowModal] = useState(false);
    const [deleteState, setDeleteState] = useState(false)
    const [likesCount, setLikesCount] = useState(data.likes || 0);

    const handleToggleModal = () => setShowModal(prev => !prev)

    const getMenuItems = () => {
        const commonItems = [
            { icon: faBookmark, title: "Save" },
            { icon: faEyeSlash, title: "Hidden" },
        ];

        if (data.user_post) {
            return [
                { icon: faPen, title: "Edit" },
                ...commonItems,
                { icon: faTrash, title: "Delete", onClick: toggleModal },
            ];
        }
        return [...commonItems, { icon: faFlag, title: "Report" }];
    };

    const handleDeletePost = async () => {
        const token = localStorage.getItem('authToken')
        const res = await deletedPostService(data.id, token)
        if (res.status === 204) {
            console.log(res)
            setDeleteState(true)
        }

        setShowModal(false)
    }


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
        const postUrl = `${packageInfo.homepage}post/${data.id}`
        navigator.clipboard.writeText(postUrl);
        alert(postUrl);
    }

    const renderContent = () => {
        return data.content?.split('\n').map((item, index) => (
            <Fragment key={index}>
                {item}
                <br />
            </Fragment>
        ));
    };

    if (isDeleted) {
        return (
            <div className={cx("wrapper", { profile })}>
                <h3>Post Deleted</h3>
            </div>
        );
    }

    return (
        <Fragment>
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
                        {showModal ? (
                            <Button iconText leftIcon={faEllipsisVertical} />
                        ) : (
                            <Menu post={true} items={data.user_post ? menuItemsOwn : menuItemsOther}>
                                <Button iconText leftIcon={faEllipsisVertical} />
                            </Menu>
                        )}
                    </div>
                </div>
                <div className={cx('title')}>
                    <Link className={cx('text-title')} to={`/post/${data.id}`}>{data.title}</Link>
                </div>
                <div className={cx('content')}>
                    <Link className={cx('text-content')} to={`/post/${data.id}`}>
                        {renderContent()}
                    </Link>
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
                            to={`/post/${data.id}`}
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
            {showModal && (
                <div className={cx('modal')}>
                    <div className={cx('container')}>
                        <div className={cx('modal-header')}>
                            <h3 className={cx('modal-heading')}>Delete post?</h3>
                            <Button onClick={handleToggleModal} iconCircle className={cx('modal-close')} leftIcon={faClose} />
                        </div>
                        <div className={cx('modal-body')}>
                            <p className={cx('modal-title')}>Once you delete this post, it can’t be restored.</p>
                        </div>
                        <div className={cx('modal-footer')}>
                            <Button onClick={handleToggleModal} round normal className={cx('btn-cancel')}>Cancel</Button>
                            <Button onClick={handleDeletePost} round deleted className={cx('btn-confirm')}>Yes, Delete</Button>
                        </div>
                    </div>
                </div>
            )}
        </Fragment>
    );
}

export default Post;