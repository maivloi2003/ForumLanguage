import * as request from '~/utils/request'

const notify = async (id) => {
    try {
        const res = await request.get(`notices/${id}`)

        return res
    } catch (error) {
        return error
    }
}

export default notify;