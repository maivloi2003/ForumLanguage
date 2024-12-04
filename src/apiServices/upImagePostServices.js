import * as request from '~/utils/request'

const upImagePost = async (img) => {
    try {
        const formData = new FormData();
        formData.append('file', img)
        const res = await request.post('upload/post', formData)

        return res
    } catch (error) {
        return error
    }
}

export default upImagePost;