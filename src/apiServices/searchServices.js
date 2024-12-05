import * as request from '~/utils/request'

const search = async (page, size, content, language, token = undefined) => {
    try {
        const config = {
            params: {
                page,
                size,
                content,
                language
            }
        }

        if (token) {
            config.headers = {
                'Authorization': `Bearer ${token}`
            }
        }
        const res = await request.get('posts', config)

        return res.result.content;
    } catch (error) {
        alert('Hết bài viết')
        return [];
    }
}

export default search;