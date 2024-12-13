import classNames from "classnames/bind";
import styles from './Profile.module.scss';
import Image from "~/components/Image";
import { useEffect, useState } from "react";
import { getUserByIdService, getPostByIdUserService } from "~/apiServices";
import Post from "~/components/Post";
import { useScroll } from "~/hooks";

const cx = classNames.bind(styles);

function Profile({ contentRef }) {
    const [user, setUser] = useState({ id: '', img: '', name: '' });
    const [currentPage, setCurrentPage] = useState(0);
    const [postsUser, setPostsUser] = useState([]);
    const token = localStorage.getItem("authToken");

    const getUserIdFromURL = () => {
        const url = window.location.pathname;
        return url.substring(url.lastIndexOf("/") + 1);
    };

    const handleGetPost = async (id, page) => {
        const res = await getPostByIdUserService(id, page, 5, token);
        if (res?.result) {
            const data = res.result.content;
            setPostsUser((prev) => (page === 0 ? data : [...prev, ...data]));
        } else {
            console.log(res);
        }
    };

    const handleGetUser = async (id) => {
        const res = await getUserByIdService(id);
        if (res?.result) {
            const tempUser = res.result;
            setUser({ id: tempUser.id, img: tempUser.img, name: tempUser.name });
            if (token) handleGetPost(tempUser.id, 0);
        }
    };

    useEffect(() => {
        const userId = getUserIdFromURL();
        if (userId) {
            setPostsUser([]);
            setCurrentPage(0);
            handleGetUser(userId);
        }
        // eslint-disable-next-line
    }, []);

    useScroll(contentRef, () => {
        setCurrentPage((prev) => prev + 1);
    });

    useEffect(() => {
        if (user.id) {
            handleGetPost(user.id, currentPage);
        }
        // eslint-disable-next-line
    }, [currentPage]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <Image src={user.img} className={cx('avatar')} alt='' />
                <div className={cx('fullname')}>{user.name}</div>
            </div>

            <div className={cx('body')}>
                {postsUser.map((post, index) => (
                    <Post profile key={post.id || index} data={post} />
                ))}
            </div>
        </div>
    );
}

export default Profile;
