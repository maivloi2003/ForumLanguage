import HeadlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { useState, useMemo } from 'react';
import MenuItem from './MenuItem';
import Header from './Header';

const cx = classNames.bind(styles);

function Menu({ children, items = [], hideOnClick = false, post = false }) {
    const [history, setHistory] = useState([{ data: items }]);
    const current = history[history.length - 1];

    const handleItemClick = (item) => {
        if (item.onClick) {
            item.onClick();
        } else if (item.children) {
            setHistory((prev) => [...prev, item.children]);
        }
    };

    const handleBack = () => {
        setHistory((prev) => prev.slice(0, prev.length - 1));
    };

    const renderItems = useMemo(
        () =>
            current.data.map((item, index) => (
                <MenuItem key={index} data={item} onClick={() => handleItemClick(item)} />
            )),
        [current.data]
    );

    return (
        <HeadlessTippy
            trigger={post ? 'click' : 'mouseenter focus'}
            offset={[12, 8]}
            interactive
            hideOnClick={hideOnClick}
            delay={[0, 500]}
            placement="bottom-end"
            render={(attrs) => (
                <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
                    <PopperWrapper className={cx('menu-popper')}>
                        {history.length > 1 && <Header title="" onClick={handleBack} />}
                        {renderItems}
                    </PopperWrapper>
                </div>
            )}
        >
            {children}
        </HeadlessTippy>
    );
}

export default Menu;
