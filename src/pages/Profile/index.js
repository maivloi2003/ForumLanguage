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

    useScroll(contentRef, () => {
        setCurrentPage(prev => prev + 1);
    });

    const handleGetPost = async (id, page, size, token) => {
        const res = await getPostByIdUserService(id, page, size, token);
        if (res.result?.content) {
            setPostsUser(prevPosts => [...prevPosts, ...res.result.content]);
        } else {
            console.log(res);
        }
    };

    const handleGetUser = async (id) => {
        const res = await getUserByIdService(id);
        if (res?.result) {
            const tempUser = res.result;
            setUser({ id: tempUser.id, img: tempUser.img, name: tempUser.name });
            const token = localStorage.getItem('authToken');
            if (token) {
                handleGetPost(tempUser.id, currentPage, 5, token);
            }
        }
    };

    useEffect(() => {
        const handleURLChange = () => {
            const url = document.URL;
            const idUser = url.substring(url.lastIndexOf('/') + 1);
            handleGetUser(idUser);
        };

        handleURLChange();
        window.addEventListener('popstate', handleURLChange);

        return () => window.removeEventListener('popstate', handleURLChange);
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (user.id && token) {
            handleGetPost(user.id, currentPage, 5, token);
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
                {postsUser && postsUser.map((item, index) => <Post profile key={index} data={item} />)}
            </div>
        </div>
    );
}

export default Profile;
