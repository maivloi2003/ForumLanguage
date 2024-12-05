import * as request from '~/utils/request'

const comment = async (id_post, content, token) => {
    try {

        const data = {
            id_post,
            content,
        }
        const res = await request.post('comments', data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        return res
    } catch (error) {
        return error
    }
}

export default comment;