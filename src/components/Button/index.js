import classNames from "classnames/bind"
import { forwardRef } from "react"
import { Link } from "react-router-dom"

import styles from "./Button.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


const cx = classNames.bind(styles)

function Button(
    {
        className,
        children,
        to,
        href,
        onClick,
        deleted = false,
        normal = false,
        disable = false,
        iconText = false,
        primary = false,
        round = false,
        leftIcon = false,
        rightIcon = false,
        iconNav = false,
        like = false,
        iconCircle = false,
        ...passProps
    }, ref) {
    let Comp = 'button'
    const props = {
        onClick,
        ...passProps
    }

    const classes = cx('wrapper', {
        [className]: className,
        round,
        primary,
        iconText,
        iconCircle,
        disable,
        normal,
        deleted,
        iconNav,
        like,
    })

    if (to) {
        Comp = Link
        props.to = to
    } else if (href) {
        Comp = 'a'
        props.href = href
    }

    // Disable
    if (disable) {
        Object.keys(props).forEach(key => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key];
            }
        })
    }

    return (
        <Comp ref={ref} className={classes} {...props}>
            {leftIcon && <FontAwesomeIcon className={cx('icon')} icon={leftIcon} />}
            {children && <span className={cx('title')}>{children}</span>}
            {rightIcon && <FontAwesomeIcon className={cx('icon')} icon={rightIcon} />}
        </Comp>
    );
}

export default forwardRef(Button);