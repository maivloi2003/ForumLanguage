import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAddressCard,
    faFire,
    faFlag,
    faHome,
    faNewspaper,
    faQuestion,
    faScroll,
    faSquareArrowUpRight,
} from '@fortawesome/free-solid-svg-icons';

import styles from './Sidebbar.module.scss';

const cx = classNames.bind(styles);

function Sidebar() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('navbar')}>
                <ul className={cx('navList')}>
                    <li className={cx('navItem')}>
                        <FontAwesomeIcon icon={faHome} />
                        <span>Home</span>
                    </li>
                    <li className={cx('navItem')}>
                        <FontAwesomeIcon icon={faFire} />
                        <span>Popular</span>
                    </li>
                    <li className={cx('navItem')}>
                        <FontAwesomeIcon icon={faSquareArrowUpRight} />
                        <span>New</span>
                    </li>
                </ul>
            </div>
            <div className={cx('languages')}>
                <span className={cx('title')}>Language</span>
                <ul className={cx('languageList')}>
                    <li className={cx('languageItem')}>
                        <FontAwesomeIcon icon={faNewspaper} />
                        <span>English</span>
                    </li>
                    <li className={cx('languageItem')}>
                        <FontAwesomeIcon icon={faNewspaper} />
                        <span>China</span>
                    </li>
                    <li className={cx('languageItem')}>
                        <FontAwesomeIcon icon={faNewspaper} />
                        <span>Japan</span>
                    </li>
                </ul>
            </div>
            <div className={cx('other')}>
                <span className={cx('title')}>Other</span>
                <ul className={cx('otherList')}>
                    <li className={cx('otherItem')}>
                        <FontAwesomeIcon icon={faAddressCard} />
                        <span>About FL</span>
                    </li>
                    <li className={cx('otherItem')}>
                        <FontAwesomeIcon icon={faFlag} />
                        <span>Advertise</span>
                    </li>
                    <li className={cx('otherItem')}>
                        <FontAwesomeIcon icon={faQuestion} />
                        <span>Help</span>
                    </li>
                    <li className={cx('otherItem')}>
                        <FontAwesomeIcon icon={faScroll} />
                        <span>Policy</span>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;
