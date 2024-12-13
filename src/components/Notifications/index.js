import classNames from "classnames/bind";
import styles from './Notifications.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles)

function Notifications({ message, onClose }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('notify')}>
                <span className={cx('message')}>{message}</span>
                <div className={cx('close-btn')} onClick={onClose}>
                    <FontAwesomeIcon icon={faTimes} />
                </div>
            </div>
        </div>
    );
}

export default Notifications;