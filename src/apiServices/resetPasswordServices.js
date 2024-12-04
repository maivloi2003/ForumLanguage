import * as request from '~/utils/request'

const resetPassword = async (data, token) => {
    try {
        const res = await request.post('mail/change', data, {
            params: {
                token
            }
        })
        return res
    } catch (error) {
        return error
    }
}

export default resetPassword;