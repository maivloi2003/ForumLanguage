import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faUser, faGear, faPlus, faSignOut, faClose, faSearch } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import styles from './Header.module.scss';
import images from '~/assets/images';
import Button from '~/components/Button';
import Image from '~/components/Image';
import { Link } from 'react-router-dom';
import Menu from '~/components/Popper/Menu';
import { infoUserCurrentService } from '~/apiServices';

const cx = classNames.bind(styles);

function Header() {
    const [searchValue, setSearchValue] = useState('');
    const [currentUser, setCurrentUser] = useState(localStorage.getItem('authToken'));
    const [infoCurrentUser, setInfoCurrentUser] = useState({
        id: '',
        name: '',
        img: '',
    });

    const inputRef = useRef();

    const menuItems = useMemo(() => [
        {
            icon: faUser,
            title: infoCurrentUser.name || 'Profile',
            to: `/ForumLanguage/users/${infoCurrentUser.id}`,
            separate: true
        },
        {
            icon: faGear,
            title: 'Setting',
            to: '/ForumLanguage/setting'
        },
        {
            icon: faCircleInfo,
            title: 'Support',
            to: '/ForumLanguage/support'
        },
        {
            icon: faSignOut,
            title: 'Logout',
            to: '/ForumLanguage/login'
        },
    ], [infoCurrentUser]);

    useEffect(() => {
        const handleStorageChange = () => {
            setCurrentUser(localStorage.getItem('authToken'));
        };
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const fetchCurrentUser = useCallback(async () => {
        if (!currentUser) return;

        const res = await infoUserCurrentService(currentUser);
        if (res?.result) {
            const { id, name, img } = res.result;
            setInfoCurrentUser({
                id,
                name,
                img: img || null
            });
        }
    }, [currentUser]);

    useEffect(() => {
        fetchCurrentUser();
    }, [fetchCurrentUser]);

    const handlers = {
        clearSearch: () => {
            setSearchValue('');
            inputRef.current.focus();
        },
        search: () => {
            window.location.href = `?content="${searchValue}"`;
        },
        handleKeyUp: (e) => {
            if (e.code === 'Enter') handlers.search();
        },
    };

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                {/* Logo */}
                <div className={cx('logo')}>
                    <Link to="/">
                        <img src={images.logo} alt="Forum " />
                        <h4 className={cx('logo-title')}>ForumLanguages</h4>
                    </Link>
                </div>

                <div className={cx('search')}>
                    <input
                        ref={inputRef}
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        onKeyUp={handlers.handleKeyUp}
                        placeholder="Search posts with content..."
                    />
                    {searchValue && (
                        <button onClick={handlers.clearSearch} className={cx('clear')}>
                            <FontAwesomeIcon icon={faClose} />
                        </button>
                    )}
                    <button onClick={handlers.search} className={cx('search-btn')}>
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                </div>

                <div className={cx('action')}>
                    {currentUser ? (
                        <>
                            <Tippy content="Create new post" placement="bottom">
                                <Button to="/ForumLanguage/upload" normal round leftIcon={faPlus}>
                                    Create
                                </Button>
                            </Tippy>
                            <Button iconText leftIcon={faBell} />
                            <Menu items={menuItems}>
                                <Image
                                    className={cx('user-avatar')}
                                    src={infoCurrentUser.img}
                                    alt={infoCurrentUser.name}
                                />
                            </Menu>
                        </>
                    ) : (
                        <>
                            <Button to="/ForumLanguage/login" normal round>
                                Login
                            </Button>
                            <Button to="/ForumLanguage/register" normal round>
                                Register
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}

export default React.memo(Header);