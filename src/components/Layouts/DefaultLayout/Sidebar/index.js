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
import { useEffect, useState } from 'react';

import styles from './Sidebar.module.scss';

const cx = classNames.bind(styles);

function Sidebar() {
    const [language, setLanguage] = useState({});
    useEffect(() => {
        const lang = JSON.parse(localStorage.getItem('lang'));
        if (lang) {
            setLanguage(lang || {});
        }
    }, []);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('navbar')}>
                <ul className={cx('navList')}>
                    <li className={cx('navItem')}>
                        <FontAwesomeIcon icon={faHome} />
                        <span>{language.homeNavHome || 'Home'}</span>
                    </li>
                    <li className={cx('navItem')}>
                        <FontAwesomeIcon icon={faFire} />
                        <span>{language.homeNavPopular || 'Popular'}</span>
                    </li>
                    <li className={cx('navItem')}>
                        <FontAwesomeIcon icon={faSquareArrowUpRight} />
                        <span>{language.homeNavNew || 'New'}</span>
                    </li>
                </ul>
            </div>
            <div className={cx('languages')}>
                <span className={cx('title')}>{language.homeNavLang || 'Language'}</span>
                <ul className={cx('languageList')}>
                    <li className={cx('languageItem')}>
                        <FontAwesomeIcon icon={faNewspaper} />
                        <span>{language.homeLangEng || 'English'}</span>
                    </li>
                    <li className={cx('languageItem')}>
                        <FontAwesomeIcon icon={faNewspaper} />
                        <span>{language.homeLangChina || 'China'}</span>
                    </li>
                    <li className={cx('languageItem')}>
                        <FontAwesomeIcon icon={faNewspaper} />
                        <span>{language.homeLangJapan || 'Japan'}</span>
                    </li>
                </ul>
            </div>
            <div className={cx('other')}>
                <span className={cx('title')}>{language.homeNavOther || 'Other'}</span>
                <ul className={cx('otherList')}>
                    <li className={cx('otherItem')}>
                        <FontAwesomeIcon icon={faAddressCard} />
                        <span>{language.homeOtherAbout || 'About FL'}</span>
                    </li>
                    <li className={cx('otherItem')}>
                        <FontAwesomeIcon icon={faFlag} />
                        <span>{language.homeOtherAdv || 'Advertise'}</span>
                    </li>
                    <li className={cx('otherItem')}>
                        <FontAwesomeIcon icon={faQuestion} />
                        <span>{language.homeOtherHelp || 'Help'}</span>
                    </li>
                    <li className={cx('otherItem')}>
                        <FontAwesomeIcon icon={faScroll} />
                        <span>{language.homeOtherPolicy || 'Policy'}</span>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;
