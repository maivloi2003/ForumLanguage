import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';

import { searchService } from '~/apiServices';
import Post from '~/components/Post';
import styles from './Home.module.scss';
import { useScroll } from '~/hooks';
import { UserContext } from '~/context/UserContext';

const cx = classNames.bind(styles);

function Home({ contentRef }) {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const infoUser = useContext(UserContext)

    const location = useLocation();

    const getParamsFromURL = () => {
        const urlParams = new URLSearchParams(location.search);
        return urlParams.get('content')?.replace(/"/g, '') || '';
    };

    const fetchPosts = async ({ page, size, content, language, token }) => {
        const res = await searchService(page, size, content, language, token);

        if (res?.result) {
            const data = res.result.content;
            setPosts((prev) => (page === 0 ? data : [...prev, ...data]));
        } else {
            console.error(res);
        }
    };

    useEffect(() => {
        const content = getParamsFromURL();
        const token = infoUser ? localStorage.getItem('authToken') : undefined;
        const data = {
            page: 0,
            size: 5,
            content,
            language: '',
            token,
        };

        setCurrentPage(0);
        setPosts([]);
        fetchPosts(data);
        // eslint-disable-next-line
    }, [location.search, infoUser]);


    useScroll(contentRef, () => {
        const content = getParamsFromURL();
        const data = {
            page: currentPage + 1,
            size: 5,
            content,
            language: '',
            token: localStorage.getItem('authToken') || undefined,
        };

        setCurrentPage((prev) => prev + 1);
        fetchPosts(data);
    });

    return (
        <div className={cx('wrapper')}>
            {posts.length > 0 && (
                posts.map((post, index) => <Post data={post} key={index} />)
            )}
        </div>
    );
}

export default Home;
