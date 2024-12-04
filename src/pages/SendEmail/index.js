import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import { useLocation } from "react-router-dom";

import styles from './SendEmail.module.scss'
import stylesGrid from '~/styles/grid.module.scss'
import Image from "~/components/Image";
import images from "~/assets/images";

const cx = classNames.bind(styles)

function SendEmail() {
    const [message, setMessage] = useState('');
    const location = useLocation()
    useEffect(() => {
        const pageName = location.state?.fromPage;
        if (pageName === 'activeAccount') {
            setMessage('Please check your email to activate your account. If you do not receive the email, please check your spam folder.')
        } else if (pageName === 'forgotPassword') {
            setMessage('Please check your email to reset your password. If you do not receive the email, please check your spam folder.')
        }
    }, [location])

    return (
        <div className={`${cx('wrapper')} ${stylesGrid.grid}`}>
            <div className={`${cx('logo')} ${stylesGrid['grid__row-6']}`}>
                <Image src={images.logo} alt='logo' className={cx('img')} />
            </div>
            <div className={`${cx('content')} ${stylesGrid['grid__row-6']}`}>
                <div className={cx('body')}>
                    <div className={cx('heading')}>
                        Check Email
                    </div>
                    <div className={cx('title')}>
                        {message}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SendEmail;
