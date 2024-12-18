import classNames from "classnames/bind";
import styles from './Setting.module.scss'
import Button from "~/components/Button";
import { useEffect, useState } from "react";

const cx = classNames.bind(styles)

function Setting() {

    const [currentUser, setCurrentUser] = useState({});
    const [language, setLanguage] = useState({});
    useEffect(() => {
        const userCurrent = JSON.parse(localStorage.getItem('currentUser'));
        const lang = JSON.parse(localStorage.getItem('lang'));
        if (userCurrent) {
            setCurrentUser(userCurrent);
            setLanguage(lang);
        }
    }, []);

    return (
        <div className={cx('wrapper')}>
            <h1 className={cx('heading')}>{language?.settingHeading}</h1>

            <ul className={cx('category')}>
                <li className={cx('item')} >{language?.settingAcc}</li>
                <li className={cx('item')} >{language?.settingProfile}</li>
                <li className={cx('item')} >{language?.settingPrivacy}</li>
                <li className={cx('item')} >{language?.settingPref}</li>
                <li className={cx('item')} >{language?.settingNotify}</li>
                <li className={cx('item')} >{language?.settingAdvance}</li>
            </ul>

            <div className={cx('account')}>
                <span className={cx('account-heading')}>{language?.settingInfoAcc}</span>
            </div>

            <div className={cx('email')}>
                <span className={cx('email-heading')}>
                    {language?.settingAddressEmail}
                </span>
                <span className={cx('email-content')}>
                    {currentUser.email}
                </span>
            </div>

            <div className={cx('gender')}>
                <div className={cx('gender-title')}>
                    <span className={cx('gender-heading')}>
                        {language?.settingHeadingGender}
                    </span>
                    <span className={cx('gender-content')}>
                        {language?.settingTitleGender}
                    </span>
                </div>
                <select
                    className={cx('gender-btn')}
                    value={currentUser.sex || ''}
                    onChange={(e) => setCurrentUser(prev => ({ ...prev, gender: e.target.value }))}
                >
                    <option value='' disabled>{language?.genderDefault}</option>
                    <option value='Male'>{language?.genderMale}</option>
                    <option value='Female'>{language?.genderFemale}</option>
                    <option value='Other'>Other</option>
                </select>
            </div>

            <div className={cx('language')}>
                <div className={cx('language-title')}>
                    <span className={cx('language-heading')}>
                        {language?.settingHeadingLangDisplay}
                    </span>
                    <span className={cx('language-content')}>
                        {language?.settingTitleLangDisplay}
                    </span>
                </div>
                <select
                    className={cx('language-btn')}
                    value={currentUser.language || ''}
                    onChange={(e) => setCurrentUser(prev => ({ ...prev, language: e.target.value }))}
                >
                    <option value='' disabled>{language?.settingBtnLangDisplay}</option>
                    <option value='English'>English</option>
                    <option value='China'>China</option>
                    <option value='Japan'>Japan</option>
                </select>
            </div>

            <div className={cx('delete')}>
                <div className={cx('delete-title')}>
                    <span className={cx('delete-heading')}>
                        {language?.settingHeadingDel}
                    </span>
                    <span className={cx('delete-content')}>
                        {language?.settingTitleDel}
                    </span>
                </div>
                <Button deleted round className={cx('delete-btn')}>{language?.settingBtnDel}</Button>
            </div>

            <div className={cx('save')}>
                <Button className={cx('save-btn')} round normal>{language?.settingBtnSave}</Button>
            </div>
        </div >
    );
}

export default Setting;
