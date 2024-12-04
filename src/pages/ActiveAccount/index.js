import { Link, useNavigate } from 'react-router-dom';
import classNames from "classnames/bind";

import styles from './ActiveAccount.module.scss'
import stylesGrid from '~/styles/grid.module.scss'
import Button from "~/components/Button";
import Image from "~/components/Image";
import images from "~/assets/images";
import { sendEmailService } from "~/apiServices";

const cx = classNames.bind(styles)

function ActiveAccount() {
    const navigate = useNavigate()

    const handleSendEmail = async () => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            console.error("No auth token found in localStorage");
            return;
        }

        const res = await sendEmailService(token);
        if (res.result?.success) {
            navigate('/sendEmail', { state: { fromPage: 'activeAccount' } });
        } else {
            console.error("Failed to send email. Response:", res);
        }
    };

    return (
        <div className={`${cx('wrapper')} ${stylesGrid.grid}`}>
            <div className={` ${stylesGrid['grid__row-6']} ${cx('logo')}`}>
                <Image className={cx('img')} src={images.logo} alt='Logo' />
            </div>
            <div className={` ${stylesGrid['grid__row-6']} ${cx('content')} `}>
                <div className={cx('header')}>
                    <h4 className={cx('heading')}>Active Your Account</h4>
                    <p className={cx('title')}>To active your account, we need to verify your email. Please press the send button and check your email.</p>
                </div>
                <div className={cx('body')}>
                    <Button onClick={handleSendEmail} className={cx('btn-send')} round primary >Send</Button>
                    <Link className={cx('link')} to='/login'>Sign in with another account?</Link>
                </div>
            </div>
        </div>
    );
}

export default ActiveAccount;
