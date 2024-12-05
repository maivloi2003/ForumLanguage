import { useState } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";

import styles from './ResetPassword.module.scss'
import stylesShare from '~/styles/share.module.scss';
import stylesGrid from '~/styles/grid.module.scss'
import Image from "~/components/Image";
import { useValidator } from '~/hooks';
import images from "~/assets/images";
import FormGroup from "~/components/FormGroup";
import { resetPasswordService } from "~/apiServices";

const cx = classNames.bind(styles)

function ResetPassword() {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        password: '',
        repassword: '',
    });

    const { errors, validateField, clearError, validateAll } = useValidator({
        rules: [
            useValidator.isRequired('password', 'This field is required'),
            useValidator.minLength('password', 5, 'Password must have at least 5 characters'),
            useValidator.isRequired('repassword', 'This field is required'),
            useValidator.isPasswordMatch('repassword', 'password', 'Passwords do not match'),
        ]
    });

    const fetchApi = async (data, token) => {
        const res = await resetPasswordService(data, token);

        if (res.result?.success) {
            alert('Change Password Success')
            navigate('/ForumLanguage/login')
        } else {
            console.log(`Error: ${res}`);

        }
    }

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        clearError(name);
    };

    const handleBlur = e => validateField(e.target.name, formData);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateAll(formData)) {
            const urlParams = new URLSearchParams(window.location.search);
            const token = urlParams.get('token');
            if (token) {
                await fetchApi(formData, token);
            }
        }
    };

    return (
        <div className={`${cx('wrapper')} ${stylesGrid.grid}`}>
            <div className={`${cx('logo')} ${stylesGrid['grid__row-6']}`}>
                <Image src={images.logo} alt='logo' className={cx('img')} />
            </div>
            <div className={`${cx('content')} ${stylesGrid['grid__row-6']}`}>
                <div className={cx('body')}>
                    <div className={cx('heading')}>
                        Reset Password
                    </div>
                    <div className={cx('title')}>
                        Please enter a new password for your account.
                    </div>
                    <form className={`${stylesShare.form} ${cx('form-reset')}`} id="form-reset">
                        <FormGroup
                            name="password"
                            type='password'
                            text='Password'
                            placeholder='Password'
                            classNameFormGroup={stylesShare.formGroup}
                            classNameLabel={stylesShare.formLabel}
                            classNameInput={stylesShare.formControl}
                            classNameError={stylesShare.formMessage}
                            classNameInvalid={stylesShare.invalid}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            value={formData.password}
                            valid={errors.password}
                        />
                        <FormGroup
                            name="repassword"
                            type='password'
                            text='Password Confirm'
                            placeholder='Password Confirm'
                            classNameFormGroup={stylesShare.formGroup}
                            classNameLabel={stylesShare.formLabel}
                            classNameInput={stylesShare.formControl}
                            classNameError={stylesShare.formMessage}
                            classNameInvalid={stylesShare.invalid}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            value={formData.repassword}
                            valid={errors.repassword}
                        />
                        <button onClick={handleSubmit} className={stylesShare.formSubmit}>Reset Password</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ResetPassword;