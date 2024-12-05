import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import { useState } from 'react';

import stylesGrid from '~/styles/grid.module.scss';
import styles from '~/styles/share.module.scss';
import images from '~/assets/images';
import Image from '~/components/Image';
import { useValidator } from '~/hooks';
import { registerService } from '~/apiServices'
import FormGroup from '~/components/FormGroup';

const cx = classNames.bind(styles)

function Register() {

    const [messageError, setMessageError] = useState({});
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        language: '',
        sex: '',
        username: '',
        password: '',
        repassword: ''
    });

    const navigate = useNavigate();

    const { errors, validateField, clearError, validateAll } = useValidator({
        rules: [
            useValidator.isRequired('fullname', 'This field is required'),
            useValidator.isRequired('email', 'This field is required'),
            useValidator.isEmail('email', 'Email address is not valid'),
            useValidator.isRequired('language', 'This field is required'),
            useValidator.isRequired('sex', 'This field is required'),
            useValidator.isRequired('username', 'This field is required'),
            useValidator.isRequired('password', 'This field is required'),
            useValidator.minLength('password', 5, 'Password must have at least 5 characters'),
            useValidator.isRequired('repassword', 'This field is required'),
            useValidator.isPasswordMatch('repassword', 'password', 'Passwords do not match'),
        ]
    });

    const fetchApi = async (data) => {
        const res = await registerService(data);

        if (res.result) {
            alert('Register Success!!')
            navigate('/ForumLanguage/login');
        } else {
            const { code, message } = res.response.data
            if (code === 40001) {
                setMessageError({ 'username': message })
            } else if (code === 40002) {
                setMessageError({ 'email': message })
            }

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
            await fetchApi(formData)
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx(stylesGrid.grid, 'register')}>
                <div className={cx(stylesGrid['grid__row-6'], 'registerLogo')}>
                    <Image className={cx('img')} src={images.logo} alt="Logo" />
                </div>
                <div className={cx(stylesGrid['grid__row-6'], 'registerContent')}>
                    <form className={cx('form')} id="form-register" onSubmit={handleSubmit}>
                        <h3 className={cx('heading')}>Login</h3>
                        <p className={cx('desc')}>Welcome To Forum Language</p>

                        <div className={cx('spacer')}></div>

                        <FormGroup
                            name="fullname"
                            text='Full Name'
                            placeholder='Ex: Nguyen Van A'
                            classNameFormGroup={cx('formGroup')}
                            classNameLabel={cx('formLabel')}
                            classNameInput={cx('formControl')}
                            classNameError={cx('formMessage')}
                            classNameInvalid={cx('invalid')}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            value={formData.fullname}
                            valid={errors.fullname}
                        />

                        <FormGroup
                            name="email"
                            text='Email'
                            placeholder='Ex: outlook@domain.com'
                            classNameFormGroup={cx('formGroup')}
                            classNameLabel={cx('formLabel')}
                            classNameInput={cx('formControl')}
                            classNameError={cx('formMessage')}
                            classNameInvalid={cx('invalid')}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            value={formData.email}
                            valid={errors.email}
                            error={messageError.email}
                        />

                        <div className={`${styles.formGroup} ${errors.language ? styles.invalid : ''}`}>
                            <label htmlFor="language" className={styles.formLabel}>Language</label>
                            <select
                                className={styles.formControl}
                                id="language"
                                name="language"
                                value={formData.language}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            >
                                <option value="" disabled>Select your language</option>
                                <option value="English">English</option>
                                <option value="China">China</option>
                                <option value="Japan">Japan</option>
                            </select>
                            {errors.language && <span className={styles.formMessage}>{errors.language}</span>}
                        </div>

                        <div className={`${styles.formGroup} ${errors.sex ? styles.invalid : ''}`}>
                            <label htmlFor="sex" className={styles.formLabel}>Gender</label>
                            <select
                                className={styles.formControl}
                                id="sex"
                                name="sex"
                                value={formData.sex}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            >
                                <option value="" disabled>Select your gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                            {errors.sex && <span className={styles.formMessage}>{errors.sex}</span>}
                        </div>

                        <FormGroup
                            name="username"
                            text='Username'
                            placeholder='Ex: maivanloi'
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
                            type='password'
                            text='Password'
                            placeholder='Password'
                            classNameFormGroup={cx('formGroup')}
                            classNameLabel={cx('formLabel')}
                            classNameInput={cx('formControl')}
                            classNameError={cx('formMessage')}
                            classNameInvalid={cx('invalid')}
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
                            classNameFormGroup={cx('formGroup')}
                            classNameLabel={cx('formLabel')}
                            classNameInput={cx('formControl')}
                            classNameError={cx('formMessage')}
                            classNameInvalid={cx('invalid')}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            value={formData.repassword}
                            valid={errors.repassword}
                        />
                        <div className={cx('link')}><Link className={cx('link-login')} to='/ForumLanguage/login'>Has Account?</Link></div>
                        <button className={cx('formSubmit')} type="submit">Register</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;
