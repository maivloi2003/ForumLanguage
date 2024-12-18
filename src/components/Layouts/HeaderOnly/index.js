import classNames from 'classnames/bind';
import React, { useRef } from 'react';
import styles from '~/components/Layouts/DefaultLayout/DefaultLayout.module.scss';
import Header from '~/components/Layouts/components/Header';

const cx = classNames.bind(styles);

function HeaderOnly({ children }) {
    const contentRef = useRef();
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('contain')}>
                <div ref={contentRef} className={cx('content')}>{children && React.cloneElement(children, { contentRef })}</div>
            </div>
        </div>
    );
}

export default HeaderOnly;