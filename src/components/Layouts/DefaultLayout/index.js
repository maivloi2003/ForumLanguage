import classNames from 'classnames/bind';
import React, { useRef } from 'react';
import styles from './DefaultLayout.module.scss';
import Sidebar from './Sidebar';
import Header from '~/components/Layouts/components/Header';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    const contentRef = useRef();

    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('contain')}>
                <Sidebar />
                <div ref={contentRef} className={cx('content')}>{children && React.cloneElement(children, { contentRef })}</div>
            </div>

        </div>
    );
}

export default DefaultLayout;