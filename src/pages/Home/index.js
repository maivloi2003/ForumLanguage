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

    const fetchPosts = async (page, size, content, language) => {
        const res = await searchService(page, size, content, language)

        setPosts((prev) => [...prev, ...res]);
    }

    useEffect(() => {
        const url = document.URL
        const params = url.substring(url.lastIndexOf('/') + 2) || undefined

        if (params === undefined) {
            fetchPosts(currentPage, 5, '', '')
        } else {
            const param = params.substring(params.indexOf('%22') + 3, params.lastIndexOf('%22'))
            fetchPosts(currentPage, 5, param, '')
        }
    }, [currentPage])

    useScroll(contentRef, () => {
        setCurrentPage(prev => prev + 1)
    })

    return (
        <div className={cx('wrapper')}>
            {posts && posts.map((post, index) => (
                <Post data={post} key={index} />
            ))}
        </div>
    );
}

export default Home;
