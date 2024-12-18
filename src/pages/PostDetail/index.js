import classNames from 'classnames/bind';
import styles from './PostDetail.module.scss'
import Post from '~/components/Post';
import { getPostByIdPostService, getCommentByIdPostService, commentService } from '~/apiServices';
import { useEffect, useState } from 'react';
import Button from '~/components/Button';
import Comment from '~/components/Comment';
import { useScroll } from '~/hooks';
import { useParams } from 'react-router-dom';

const cx = classNames.bind(styles)

function PostDetail({ contentRef }) {
    const { id_post: idPost } = useParams();
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [valueContent, setValueContent] = useState('')
    const [pageCurrent, setPageCurrent] = useState(0)
    const [language, setLanguage] = useState(null);

    useEffect(() => {
        const lang = JSON.parse(localStorage.getItem('lang'));
        if (lang) {
            setLanguage(lang);
        }
    }, []);
    const fetchPost = async (id, token) => {
        const res = await getPostByIdPostService(id, token);
        if (res?.result) setPost(res.result);
    };

    const fetchComments = async (id, page, size, token) => {
        const res = await getCommentByIdPostService(id, page, size, token);
        if (res.result?.content) {
            setComments((prev) => [...prev, ...res.result.content]);
        } else {
            console.log(res);
        }
    };

    const handleCancel = (e) => {
        e.preventDefault()
        setValueContent('')
    }

    const addComment = async (id_post, content, token) => {
        const res = await commentService(id_post, content, token);
        if (res?.result) {
            setComments((prev) => [res.result, ...prev]);
            setValueContent('');
        } else {
            console.log(res);
        }
    };

    useScroll(contentRef, () => setPageCurrent(prev => prev + 1))

    const handleComment = (id) => async (e) => {
        e.preventDefault()
        const token = localStorage.getItem('authToken')
        if (token && valueContent.trim()) {
            await addComment(id, valueContent, token)
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        fetchPost(idPost, token);
    }, [idPost]);


    useEffect(() => {
        const token = localStorage.getItem('authToken');
        fetchComments(idPost, pageCurrent, 5, token);
    }, [idPost, pageCurrent]);


    return (
        <div className={cx('wrapper')}>
            {Object.keys(post).length > 0 && (
                <>
                    <Post data={post} />
                    <div className={cx('cmt')}>
                        <form className={cx('form')}>
                            <textarea value={valueContent} onChange={e => setValueContent(e.target.value)} name="comment" className={cx('content')} placeholder={language?.postPlaceHolderComment} id=""></textarea>
                            <div className={cx('btn')}>
                                <Button onClick={handleCancel} round normal className={cx('cancel-btn')}>{language?.postBtnCancel}</Button>
                                <Button onClick={handleComment(post.id)} round primary className={cx('submit-btn')}>{language?.postBtnComment}</Button>
                            </div>
                        </form>

                        <div className={cx('body')}>
                            {comments && comments.map((item, index) => <Comment key={index} data={item} language={language} />)}
                        </div>

                    </div>
                </>
            )}
        </div>
    );
}

export default PostDetail;
