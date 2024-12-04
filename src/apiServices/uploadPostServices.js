import * as request from '~/utils/request'

const uploadPost = async (data, token) => {
    try {
        const res = await request.post('posts', data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        return res
    } catch (error) {
        return error
    }
}

export default uploadPost;