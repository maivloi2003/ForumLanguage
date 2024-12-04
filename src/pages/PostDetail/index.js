import classNames from 'classnames/bind';
import styles from './PostDetail.module.scss'
import Post from '~/components/Post';
import { getPostByIdPostService, getCommentByIdPostService } from '~/apiServices';
import { useEffect, useState } from 'react';
import Button from '~/components/Button';
import Comment from '~/components/Comment';

const cx = classNames.bind(styles)

function PostDetail() {
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);


    const handleGetPost = async (id, token) => {
        const res = await getPostByIdPostService(id, token)

        if (res?.result) {
            setPost(res.result)
        }
    }

    const handleGetComment = async (id, page, size, token) => {
        const res = await getCommentByIdPostService(id, page, size, token)
        if (res.result?.content) {
            setComments(res.result.content)
        } else {
            console.log(res);
        }
    }

    useEffect(() => {
        const url = document.URL
        const idPost = url.substring(url.lastIndexOf('/') + 1)
        const token = localStorage.getItem('authToken')
        handleGetPost(idPost, token);
        handleGetComment(idPost, 0, 5, token)
    }, [])

    return (
        <div className={cx('wrapper')}>
            {post && (
                <>
                    <Post data={post} />
                    <div className={cx('cmt')}>
                        <form className={cx('form')}>
                            <textarea name="comment" className={cx('content')} placeholder="Add Comment" id=""></textarea>
                            <div className={cx('btn')}>
                                <Button round normal className={cx('cancel-btn')}>Cancel</Button>
                                <Button round primary className={cx('submit-btn')}>Comment</Button>
                            </div>
                        </form>

                        <div className={cx('body')}>
                            {comments && comments.map((item, index) => <Comment key={index} data={item} />)}
                        </div>

                    </div>
                </>
            )}
        </div>
    );
}

export default PostDetail;
