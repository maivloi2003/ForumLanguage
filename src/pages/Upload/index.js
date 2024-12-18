import classNames from "classnames/bind";
import {
    faBold,
    faImage,
    faItalic,
    faTrashCan,
    faUnderline
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import styles from './Upload.module.scss';
import Button from "~/components/Button";
import Image from "~/components/Image";
import { upImagePostService, uploadPostService } from "~/apiServices";

const cx = classNames.bind(styles);

function Upload() {
    const [showImg, setShowImg] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    const [isUnderline, setIsUnderline] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        img: '',
        language: '',
    });
    const fileInputRef = useRef();
    const navigate = useNavigate();
    const [language, setLanguage] = useState({});
    useEffect(() => {
        const lang = JSON.parse(localStorage.getItem('lang'));
        if (lang) {
            setLanguage(lang);
        }
    }, []);
    useEffect(() => {
        document.title = formData.title || 'ForumLanguages';
    }, [formData]);

    const handleInputChange = (field) => (e) => {
        const value = e.target.value;
        setFormData((prev) => ({ ...prev, [field]: value }));
        setIsButtonDisabled(!(formData.title && formData.content && formData.language));
    };

    const handleBlur = () => setIsButtonDisabled(!(formData.title && formData.content && formData.language));

    const handleImageUpload = () => fileInputRef.current.click();

    const handleFileChange = (e) => {
        e.preventDefault();
        const imgFile = e.target.files[0];
        if (imgFile) {
            const reader = new FileReader();
            reader.onload = () => {
                setFormData((prev) => ({ ...prev, img: reader.result }));
                setShowImg(true);
            };
            reader.readAsDataURL(imgFile);
        }
    };

    const uploadImage = async (imgFile) => {
        if (imgFile) {
            const res = await upImagePostService(imgFile);
            return res?.result?.valid ? res.result.link : '';
        }
        return '';
    };

    const handleDeleteContent = () => {
        setFormData(prev => ({ ...prev, content: '' }))
    }

    const handleToggleBold = (e) => {
        e.preventDefault()
        setIsBold(prev => !prev)

    }

    const handleToggleItalic = (e) => {
        e.preventDefault()
        setIsItalic(prev => !prev)
    }

    const handleToggleUnderline = (e) => {
        e.preventDefault()
        setIsUnderline(prev => !prev)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let imgLink = undefined
        if (fileInputRef.current.files[0]) {
            imgLink = await uploadImage(fileInputRef.current.files[0]);
        }
        const data = { ...formData, img: imgLink || formData.img };
        const token = localStorage.getItem('authToken')
        const res = await uploadPostService(data, token);
        if (res?.result) {
            navigate(`/ForumLanguage/post/${res.result.id}`);
        } else {
            console.log(res);
        }

    };


    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <h3 className={cx('header-heading')}>{language.uploadHeading}</h3>
            </div>
            <form className={cx('form')} onSubmit={handleSubmit}>
                <div className={cx('kind')}>
                    <span className={cx('kind-title')}>{language.uploadTitleLang}:</span>
                    <select
                        value={formData.language}
                        onChange={handleInputChange('language')}
                        className={cx('kind-select')}
                    >
                        <option value='' disabled>{language.uploadBtnLang}</option>
                        <option value='English'>English</option>
                        <option value='China'>China</option>
                        <option value='Japan'>Japan</option>
                    </select>
                </div>
                <div className={cx('body')}>
                    <div className={cx('title')}>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={handleInputChange('title')}
                            onBlur={handleBlur}
                            className={cx('title-input')}
                            placeholder={language.uploadPlaceHolderTitle}
                        />
                    </div>
                    <div className={cx('content')}>
                        <div className={cx('content-header')}>
                            <Button className={isBold ? `${cx('selected')}` : ''} iconNav leftIcon={faBold} onClick={handleToggleBold} />
                            <Button className={isItalic ? `${cx('selected')}` : ''} iconNav leftIcon={faItalic} onClick={handleToggleItalic} />
                            <Button className={isUnderline ? `${cx('selected')}` : ''} iconNav leftIcon={faUnderline} onClick={handleToggleUnderline} />
                            <Button type="button" iconNav leftIcon={faImage} onClick={handleImageUpload}>
                                <input
                                    type="file"
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                />
                            </Button>
                            <Button iconNav leftIcon={faTrashCan} onClick={handleDeleteContent} />
                        </div>
                        <textarea
                            value={formData.content}
                            onChange={handleInputChange('content')}
                            onBlur={handleBlur}
                            className={cx('content-text', isBold ? 'bold' : '', isItalic ? 'italic' : '', isUnderline ? 'underline' : '')}
                            placeholder={language.uploadPlaceHolderContent}
                        ></textarea>
                    </div>
                    {showImg && (
                        <div className={cx('file')}>
                            <Image className={cx('file-img')} src={formData.img} alt="Uploaded" />
                        </div>
                    )}
                    <div className={cx('upload')}>
                        <Button type='submit' round normal={!isButtonDisabled} disabled={isButtonDisabled} className={cx('upload-btn')}>
                            {language.uploadBtnUpload}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Upload;
