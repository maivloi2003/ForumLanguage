import { useState, useRef, useMemo, useContext, useEffect } from 'react';
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
import { UserContext } from '~/context/UserContext';
import routesConfig from '~/config/routes'
import { notifyService } from '~/apiServices';
import Notifications from '~/components/Notifications';

const cx = classNames.bind(styles);

function Header() {
    const [searchValue, setSearchValue] = useState('');
    const { infoUser } = useContext(UserContext);
    const [notifications, setNotifications] = useState([]);
    const [notify, setNotify] = useState({})
    const navigate = useNavigate();
    const timeoutRef = useRef(null);

    const inputRef = useRef();

    const menuItems = useMemo(() => [
        {
            icon: faUser,
            title: infoUser?.name || 'Profile',
            to: `/ForumLanguage/users/${infoUser?.id || ''}`,
            separate: true,
        },
        { icon: faGear, title: 'Setting', to: '/ForumLanguage/setting' },
        { icon: faCircleInfo, title: 'Support' },
        { icon: faSignOut, title: 'Logout', to: '/ForumLanguage/login' },
    ], [infoUser]);

    const fetchNotifications = async (id_user) => {
        const res = await notifyService(id_user);

        if (res?.result) {
            setNotifications(res.result)
        }
    }

    const initializeWebSocket = (userId) => {
        const socket = new SockJS('https://moonlit-poetry-438713-c2.uc.r.appspot.com/ws');
        const stompClient = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,
        });

        stompClient.onConnect = () => {
            stompClient.subscribe(`/topic/user/${userId}`, (message) => {
                try {
                    const res = JSON.parse(message.body)
                    setNotify({
                        display: true,
                        message: res.message
                    })
                    if (timeoutRef.current) {
                        clearTimeout(timeoutRef.current);
                    }

                    timeoutRef.current = setTimeout(() => {
                        setNotify({});
                    }, 3000);
                } catch (error) {
                    console.log(error)
                }
            });
        };

        stompClient.activate();

        return stompClient;
    };

    useEffect(() => {
        if (!infoUser?.id) return;


        const stompClient = initializeWebSocket(infoUser.id);
        fetchNotifications(infoUser.id, setNotifications);

        return () => {
            stompClient.deactivate();
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [infoUser]);

    const handlers = {
        clearSearch: () => {
            setSearchValue('');
            inputRef.current.focus();
        },
        search: () => {
            if (searchValue.trim()) {
                navigate(`/ForumLanguage/?content="${searchValue.trim()}"`);
            }
        },
        handleKeyUp: (e) => {
            if (e.code === 'Enter') handlers.search();
        },
    };

    const handleChange = (e) => {
        const valueSearch = e.target.value
        if (!valueSearch.startsWith(' ')) {
            setSearchValue(e.target.value)
        }
    }

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                {/* Logo */}
                <div className={cx('logo')}>
                    <Link to={routesConfig.home}>
                        <img src={images.logo} alt="Forum" />
                        <h4 className={cx('logo-title')}>ForumLanguages</h4>
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
                    <button onMouseDown={e => e.preventDefault()} onClick={handlers.search} className={cx('search-btn')}>
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                </div>

                {/* Actions */}
                <div className={cx('action')}>
                    {!!infoUser ? (
                        <>
                            <Tippy content="Create new post" placement="bottom">
                                <Button to={routesConfig.upload} normal round leftIcon={faPlus}>
                                    Create
                                </Button>
                            </Tippy>
                            <History items={notifications} avatar={infoUser.img} header title='Thông báo' textBtn='Đánh dấu đã đọc'>
                                <Button className={cx('notify-btn')} iconText leftIcon={faBell} />
                            </History>
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
        </header >
    );
}

export default Header;
