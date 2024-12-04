import * as request from '~/utils/request';

const verifyAccount = async (token) => {
    try {
        const res = await request.post('mail/verify', {}, {
            params: {
                token,
            }
        })

        return res
    } catch (error) {
        return error
    }
}

export default verifyAccount;