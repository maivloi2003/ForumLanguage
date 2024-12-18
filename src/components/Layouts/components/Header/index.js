import { useState, useRef, useMemo, useEffect, useContext, useCallback } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faUser, faGear, faPlus, faSignOut, faClose, faSearch } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { Link, useNavigate } from 'react-router-dom';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

import styles from './Header.module.scss';
import images from '~/assets/images';
import Button from '~/components/Button';
import Image from '~/components/Image';
import Menu from '~/components/Popper/Menu';
import History from '~/components/Popper/History';
import routesConfig from '~/config/routes';
import { notifyService, infoUserCurrentService } from '~/apiServices';
import Notifications from '~/components/Notifications';
import { UserContext } from '~/context/UserContext';
import { LanguageContext } from '~/context/LanguageContext';

const cx = classNames.bind(styles);

function Header() {
    const [searchValue, setSearchValue] = useState('');
    const [notifications, setNotifications] = useState([]);
    const [notify, setNotify] = useState({});
    const navigate = useNavigate();
    const timeoutRef = useRef(null);
    const inputRef = useRef();
    const stompClientRef = useRef(null);
    const { user, setUser } = useContext(UserContext);
    const { language, setLanguage } = useContext(LanguageContext);

    useEffect(() => {
        const initializeUser = async () => {
            const userCurrent = JSON.parse(localStorage.getItem('currentUser'));
            const lang = JSON.parse(localStorage.getItem('lang'));

            if (userCurrent) {
                setUser(userCurrent);
                setLanguage(lang)
                const token = localStorage.getItem('authToken');
                if (token) {
                    const isValid = await fetchInfoUser();
                    if (isValid) {
                        initializeWebSocket(userCurrent.id);
                        fetchNotifications(userCurrent.id);
                    } else {
                        localStorage.clear();
                        setUser(null);
                    }
                }
            }
        };

        initializeUser();

        return () => {
            if (stompClientRef.current) {
                stompClientRef.current.deactivate();
            }
        };
        // eslint-disable-next-line
    }, [setUser]);

    const fetchNotifications = async (id_user) => {
        try {
            const res = await notifyService(id_user);
            if (res?.result) {
                setNotifications(res.result);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const fetchInfoUser = useCallback(async () => {
        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                return false;
            }

            const res = await infoUserCurrentService(token);
            if (!res?.result) {
                localStorage.clear();
                return false;
            }
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }, []);

    const initializeWebSocket = (userId) => {
        if (stompClientRef.current) {
            stompClientRef.current.deactivate();
        }

        const socket = new SockJS('https://moonlit-poetry-438713-c2.uc.r.appspot.com/ws');
        const stompClient = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,
        });

        stompClient.onConnect = () => {
            stompClient.subscribe(`/topic/user/${userId}`, (message) => {
                try {
                    const res = JSON.parse(message.body);
                    setNotify({
                        display: true,
                        message: res.message,
                    });

                    if (timeoutRef.current) {
                        clearTimeout(timeoutRef.current);
                    }

                    timeoutRef.current = setTimeout(() => {
                        setNotify({});
                    }, 3000);
                } catch (error) {
                    console.log(error);
                }
            });
        };

        stompClient.activate();
        stompClientRef.current = stompClient;
    };

    const handlers = useMemo(() => ({
        clearSearch: () => {
            setSearchValue('');
            inputRef.current?.focus();
        },
        search: () => {
            if (searchValue.trim()) {
                navigate(`/ForumLanguage/?content="${encodeURIComponent(searchValue.trim())}"`);
            }
        },
        handleKeyUp: (e) => {
            if (e.code === 'Enter') handlers.search();
        },
    }), [searchValue, navigate]);

    const handleChange = useCallback((e) => {
        const valueSearch = e.target.value;
        if (!valueSearch.startsWith(' ')) {
            setSearchValue(valueSearch);
        }
    }, []);

    const menuItems = useMemo(() => [
        {
            icon: faUser,
            title: user?.name || '',
            to: `/ForumLanguage/users/${user?.id || ''}`,
            separate: true,
        },
        { icon: faGear, title: language?.headerSetting || 'Settings', to: '/ForumLanguage/setting' },
        { icon: faCircleInfo, title: language?.headerSupport || 'Support' },
        { icon: faSignOut, title: language?.headerLogout || 'Logout', to: '/ForumLanguage/login' },
    ], [user, language]);

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                {/* Logo */}
                <div className={cx('logo')}>
                    <Link to={routesConfig.home}>
                        <img src={images.logo} alt="Forum" />
                        <h4 className={cx('logo-title')}>Forumlanguages</h4>
                    </Link>
                </div>

                {/* Search */}
                <div className={cx('search')}>
                    <input
                        ref={inputRef}
                        value={searchValue}
                        onChange={handleChange}
                        onKeyUp={handlers.handleKeyUp}
                        placeholder="Search posts with content..."
                    />
                    {searchValue && (
                        <button onClick={handlers.clearSearch} className={cx('clear')}>
                            <FontAwesomeIcon icon={faClose} />
                        </button>
                    )}
                    <button onMouseDown={(e) => e.preventDefault()} onClick={handlers.search} className={cx('search-btn')}>
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                </div>

                {/* Actions */}
                <div className={cx('action')}>
                    {user?.id ? (
                        <>
                            <Tippy content={language?.headerTippyCreate || 'Create'} placement="bottom">
                                <Button to={routesConfig.upload} normal round leftIcon={faPlus}>
                                    {language?.headerCreate || 'Create'}
                                </Button>
                            </Tippy>
                            <History items={notifications} avatar={user.img} header title="Thông báo" textBtn="Đánh dấu đã đọc">
                                <Button className={cx('notify-btn')} iconText leftIcon={faBell} />
                            </History>
                            <Menu items={menuItems}>
                                <Image
                                    className={cx('user-avatar')}
                                    src={user?.img}
                                    alt={user?.name || 'User Avatar'}
                                />
                            </Menu>
                        </>
                    ) : (
                        <>
                            <Button to={routesConfig.login} normal round>
                                Login
                            </Button>
                            <Button to={routesConfig.register} normal round>
                                Register
                            </Button>
                        </>
                    )}
                </div>
            </div>

            {notify.display && <Notifications message={notify.message} onClose={() => setNotify({})} />}
        </header>
    );
}

export default Header;
