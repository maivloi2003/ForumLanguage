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
    const { infoUser } = useContext(UserContext);

    const location = useLocation();

    const getParamsFromURL = () => {
        const urlParams = new URLSearchParams(location.search);
        return urlParams.get('content')?.replace(/"/g, '') || '';
    };

    const fetchPosts = async ({ page, size, content, language, token }) => {
        try {
            const res = await searchService(page, size, content, language, token);
            if (res?.result) {
                const data = res.result.content;
                setPosts((prev) => (page === 0 ? data : [...prev, ...data]));
            } else {
                console.error('Failed to fetch posts:', res);
            }
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            const fetchData = async () => {
                const content = getParamsFromURL();
                const token = infoUser ? localStorage.getItem('authToken') : undefined;

                setCurrentPage(0);
                setPosts([]);

                await fetchPosts({
                    page: 0,
                    size: 5,
                    content,
                    language: '',
                    token,
                });
            };

            fetchData();
        }, 500);

        return () => clearTimeout(timeoutId)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [infoUser]);

    useScroll(contentRef, () => {
        const content = getParamsFromURL();
        const token = infoUser ? localStorage.getItem('authToken') : undefined;

        fetchPosts({
            page: currentPage + 1,
            size: 5,
            content,
            language: '',
            token,
        });

        setCurrentPage((prev) => prev + 1);
    });

    return (
        <div className={cx('wrapper')}>
            {posts.map((post, index) => (
                <Post data={post} key={post.id || index} />
            ))}
        </div>
    );
}

export default Home;
