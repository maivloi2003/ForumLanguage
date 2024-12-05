import { useEffect, useState } from 'react'
import classNames from 'classnames/bind';

import { searchService } from '~/apiServices'
import Post from '~/components/Post';
import styles from './Home.module.scss'
import { useScroll } from '~/hooks'

const cx = classNames.bind(styles)

function Home({ contentRef }) {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);

    const fetchPosts = async ({ page, size, content, language, token }) => {
        const res = await searchService(page, size, content, language, token)

        if (res) {
            setPosts((prev) => [...prev, ...res]);
        }
    }

    const getParamsFromURL = () => {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('content')?.replace(/"/g, '') || '';
    };

    useEffect(() => {
        const content = getParamsFromURL()
        const data = {
            page: currentPage,
            size: 5,
            content,
            language: '',
            token: localStorage.getItem('authToken') || undefined
        }

        fetchPosts(data)
    }, [currentPage])

    useScroll(contentRef, () => {
        setCurrentPage((prev) => prev + 1);
    });

    return (
        <div className={cx('wrapper')}>
            {posts.length > 0 && posts.map((post, index) => (
                <Post data={post} key={index} />
            ))}
        </div>
    );
}

export default Home;
