import * as request from '~/utils/request'

const getLang = async (language) => {
    try {
        const res = await request.get(`translates/${language}`);

        return res
    } catch (error) {
        return error
    }
}

export default getLang