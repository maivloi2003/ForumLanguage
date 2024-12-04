import { useState, useRef, useEffect, useCallback } from 'react';
import classNames from 'classnames/bind';
import { faCircleInfo, faUser, faGear, faPlus, faSignOut, faClose, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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

    const [menuItems, setMenuItems] = useState([
        {
            icon: faUser,
            title: '',
            to: '',
            separate: true,
        },
        {
            icon: faGear,
            title: 'Setting',
            to: '/setting',
        },
        {
            icon: faCircleInfo,
            title: 'Support',
            to: '/support',
        },
        {
            icon: faSignOut,
            title: 'Logout',
            to: '/login',
        },
    ]);
    const inputRef = useRef()

    useEffect(() => {
        const handleStorageChange = () => {
            setCurrentUser(localStorage.getItem('authToken'));
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const handleShowUserCurrent = useCallback(async (token) => {
        if (!token) return;
        const res = await infoUserCurrentService(token);

        if (res?.result) {
            const user = res.result;

            setInfoCurrentUser({
                id: user.id,
                name: user.name,
                img: user.img || null,
            });

            setMenuItems((prevItems) =>
                prevItems.map((item) =>
                    item.icon === faUser
                        ? { ...item, title: user.name, to: `/users/${user.id}` }
                        : item
                )
            );
        }
    }, []);

    useEffect(() => {
        handleShowUserCurrent(currentUser);
    }, [currentUser, handleShowUserCurrent]);

    const handleClear = () => {
        setSearchValue('')
        inputRef.current.focus()
    }

    const handleKeyUp = (e) => {
        if (e.code === 'Enter') {
            window.location.href = `?content="${searchValue}"`
        }
    };

    const handleSearch = () => {
        window.location.href = `?content="${searchValue}"`

    }

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
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
                        onKeyUp={(e) => handleKeyUp(e)}
                        placeholder="Search posts with content..."
                    />
                    {!!searchValue && (
                        <button onClick={handleClear} className={cx('clear')}>
                            <FontAwesomeIcon icon={faClose} />
                        </button>
                    )}
                    <button onClick={handleSearch} className={cx('search-btn')}>
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                </div>

                <div className={cx('action')}>
                    {
                        currentUser ? (
                            <>
                                <Tippy content="Create new post" placement='bottom'>
                                    <Button to={'/upload'} normal round leftIcon={faPlus}>Create</Button>
                                </Tippy>
                                <Button iconText leftIcon={faBell} />
                                <Menu items={menuItems}>
                                    <Image className={cx('user-avatar')} src={infoCurrentUser.img} alt={infoCurrentUser.name} />
                                </Menu>
                            </>
                        ) : (
                            <>
                                <Button to={'/login'} normal round >Login</Button>
                                <Button to={'/register'} normal round >Register</Button>
                            </>
                        )
                    }

                </div>
            </div>
        </header>
    );
}

export default Header;
