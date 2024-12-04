import * as request from '~/utils/request'

const checkActive = async (token) => {
    try {
        const res = await request.post('accounts/check', {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return res
    } catch (error) {
        return error
    }
}

export default checkActive;