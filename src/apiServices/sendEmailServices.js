import * as request from '~/utils/request'

const sendEmail = async(token) => {
    try {
        const res = await request.post('/mail/send', {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        return res
    } catch (error) {
        return error
    }

}

export default sendEmail;