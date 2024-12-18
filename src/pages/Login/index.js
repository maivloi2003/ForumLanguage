import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import stylesGrid from '~/styles/grid.module.scss'
import styles from '~/styles/share.module.scss'
import images from "~/assets/images";
import Image from "~/components/Image";
import { useValidator } from '~/hooks';
import FormGroup from '~/components/FormGroup';
import { loginService, checkActiveService, infoUserCurrentService, getLangService } from '~/apiServices'
import routesConfig from '~/config/routes'

const cx = classNames.bind(styles)

function Login() {
    const navigate = useNavigate()
    const [messageError, setMessageError] = useState({});
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    useEffect(() => {
        localStorage.clear()
    }, [])

    const { errors, validateField, clearError, validateAll } = useValidator({
        rules: [
            useValidator.isRequired('username', 'This field is required'),
            useValidator.isRequired('password', 'This field is required'),
        ],
    });

    const fetchApiLogin = async (data) => {
        const res = await loginService(data);
        if (!res.result) {
            const { code, message } = res.response.data;
            setMessageError((prev) => ({
                ...prev,
                [code === 40401 ? 'username' : 'password']: message,
            }));
            return;
        }

        const token = res.result.token;
        localStorage.setItem('authToken', token);

        if (token) {
            const activeRes = await checkActiveService(token);
            if (activeRes.result?.active) {
                const userInfoRes = await infoUserCurrentService(token);
                const userResponse = userInfoRes.result
                if (userResponse) {
                    localStorage.setItem('currentUser', JSON.stringify(userResponse))
                    const languageRes = await getLangService(userResponse.language)
                    if (languageRes?.result) {
                        const resultObj = languageRes.result.reduce((acc, item) => {
                            acc[item.keyName] = item.translated;
                            return acc;
                        }, {});
                        localStorage.setItem('lang', JSON.stringify(resultObj))
                        navigate(routesConfig.home);
                    }
                }
            } else {
                navigate(routesConfig.activeAccount);
            }
        }

    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        clearError(name);
    };

    const handleBlur = (e) => {
        validateField(e.target.name, formData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateAll(formData)) {
            await fetchApiLogin(formData);
        } else {
            console.log('Có lỗi xảy ra:', errors);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx(stylesGrid.grid, 'login')}>
                <div className={cx(stylesGrid['grid__row-6'], 'loginLogo')}>
                    <Image className={cx('img')} src={images.logo} alt="Logo" />
                </div>
                <div className={cx(stylesGrid['grid__row-6'], 'loginContent')}>
                    <form className={cx('form')} id="form-login" onSubmit={handleSubmit}>
                        <h3 className={cx('heading')}>Login</h3>
                        <p className={cx('desc')}>Welcome To Forum Language</p>

                        <div className={cx('spacer')}></div>

                        <FormGroup
                            name="username"
                            text="Username"
                            placeholder="Ex: maivanloi"
                            classNameFormGroup={cx('formGroup')}
                            classNameLabel={cx('formLabel')}
                            classNameInput={cx('formControl')}
                            classNameError={cx('formMessage')}
                            classNameInvalid={cx('invalid')}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            value={formData.username}
                            valid={errors.username}
                            error={messageError.username}
                        />

                        <FormGroup
                            name="password"
                            text="Password"
                            type="password"
                            placeholder="Password"
                            classNameFormGroup={cx('formGroup')}
                            classNameLabel={cx('formLabel')}
                            classNameInput={cx('formControl')}
                            classNameError={cx('formMessage')}
                            classNameInvalid={cx('invalid')}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            value={formData.password}
                            valid={errors.password}
                            error={messageError.password}
                        />
                        <div className={cx('link')}>
                            <Link className={cx('link-forgot')} to={routesConfig.forgotPassword} >Forgot Password ?</Link>
                            <Link className={cx('link-register')} to={routesConfig.register} >Register</Link>
                        </div>
                        <button className={cx('formSubmit')} type="submit">Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
