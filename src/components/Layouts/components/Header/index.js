import { useState, useRef, useMemo, useContext } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faUser, faGear, faPlus, faSignOut, faClose, faSearch } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { Link, useNavigate } from 'react-router-dom';

import styles from './Header.module.scss';
import images from '~/assets/images';
import Button from '~/components/Button';
import Image from '~/components/Image';
import Menu from '~/components/Popper/Menu';
import { UserContext } from '~/context/UserContext';

const cx = classNames.bind(styles);

function Header() {
    const [searchValue, setSearchValue] = useState('');
    const { infoUser } = useContext(UserContext);
    const navigate = useNavigate();

    const inputRef = useRef();

    const menuItems = useMemo(() => [
        {
            icon: faUser,
            title: infoUser?.name || 'Profile',
            to: `/users/${infoUser?.id || ''}`,
            separate: true,
        },
        { icon: faGear, title: 'Setting', to: '/setting' },
        { icon: faCircleInfo, title: 'Support' },
        { icon: faSignOut, title: 'Logout', to: '/login' },
    ], [infoUser]);

    const handlers = {
        clearSearch: () => {
            setSearchValue('');
            inputRef.current.focus();
        },
        search: () => {
            if (searchValue.trim()) {
                navigate(`/?content="${searchValue.trim()}"`);
            }
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
                        <img src={images.logo} alt="Forum" />
                        <h4 className={cx('logo-title')}>ForumLanguages</h4>
                    </Link>
                </div>

                {/* Search */}
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

                {/* Actions */}
                <div className={cx('action')}>
                    {!!infoUser ? (
                        <>
                            <Tippy content="Create new post" placement="bottom">
                                <Button to="/upload" normal round leftIcon={faPlus}>
                                    Create
                                </Button>
                            </Tippy>
                            <Button iconText leftIcon={faBell} />
                            <Menu items={menuItems}>
                                <Image
                                    className={cx('user-avatar')}
                                    src={infoUser?.img}
                                    alt={infoUser?.name || 'User Avatar'}
                                />
                            </Menu>
                        </>
                    ) : (
                        <>
                            <Button to="/login" normal round>
                                Login
                            </Button>
                            <Button to="/register" normal round>
                                Register
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
