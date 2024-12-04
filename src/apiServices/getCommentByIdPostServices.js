import * as request from '~/utils/request'

const getCommentByIdPost = async (id_post, page, size, token) => {
    try {
        const res = await request.get('comments', {
            params: {
                id_post,
                page,
                size,
            },
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        return res
    } catch (error) {
        return error
    }
}

export default getCommentByIdPost;