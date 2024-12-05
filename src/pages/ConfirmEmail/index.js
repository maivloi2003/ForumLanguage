import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";

import styles from './ConfirmEmail.module.scss'
import stylesGrid from '~/styles/grid.module.scss'
import Image from "~/components/Image";
import images from "~/assets/images";
import { verifyAccountService } from "~/apiServices";

const cx = classNames.bind(styles)

function ConfirmEmail() {
    const [status, setStatus] = useState({
        heading: '',
        title: '',
        showLink: false,
    })

    const fetchApi = async (token) => {
        const res = await verifyAccountService(token)
        if (res.result?.success) {
            setStatus({
                heading: 'Active Success',
                title: 'You have successfully activated your account. Please log in to your account and experience it.',
                showLink: true,
            })

        } else {
            const { message } = res.response.data
            setStatus({
                heading: 'Active Error',
                title: message,
                showLink: false,
            })
        }
    }

    useEffect(() => {
        const url = document.URL
        const urlParam = new URLSearchParams(url.split('?')[1])
        const token = urlParam.get('token')

        if (token) {
            fetchApi(token);
        }
    }, [])

    return (
        <div className={`${cx('wrapper')} ${stylesGrid.grid}`}>
            <div className={`${cx('logo')} ${stylesGrid['grid__row-6']}`}>
                <Image src={images.logo} alt='logo' className={cx('img')} />
            </div>
            <div className={`${cx('content')} ${stylesGrid['grid__row-6']}`}>
                <div className={cx('body')}>
                    <div className={cx('heading')}>{status.heading}</div>
                    <div className={cx('title')}>{status.title}</div>
                    {status.showLink && <Link to='/ForumLanguage/login' className={cx('link')}>Go to the login page!</Link>}
                </div>
            </div>
        </div>
    );
}

export default ConfirmEmail;
