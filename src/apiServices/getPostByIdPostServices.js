import * as request from '~/utils/request'

const getPostByIdPost = async (id, token) => {
    try {
        const res = await request.get(`posts/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        return res
    } catch (error) {
        return error
    }
}

export default getPostByIdPost;