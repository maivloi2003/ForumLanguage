import * as request from '~/utils/request'
const like = async (id_post, liked, token) => {
    try {
        const res = await request.post(
            'likes',
            {
                id_post,
                liked
            },
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        )
        return res
    } catch (error) {
        return error
    }
}
export default like