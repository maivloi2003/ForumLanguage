import classNames from "classnames/bind";
import styles from './Upload.module.scss';
import {
    faBold,
    faImage,
    faItalic,
    faTrashCan,
    faUnderline
} from "@fortawesome/free-solid-svg-icons";
import Button from "~/components/Button";
import Image from "~/components/Image";
import { useEffect, useRef, useState } from "react";
import { upImagePostService, uploadPostService } from "~/apiServices";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

function Upload() {
    const [showImg, setShowImg] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        img: '',
        language: '',
    });
    const fileInputRef = useRef();
    const navigate = useNavigate();

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
        e.preventDefault()
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const imgLink = await uploadImage(fileInputRef.current.files[0]);
        const data = { ...formData, img: imgLink || formData.img };
        const token = localStorage.getItem('authToken')
        const res = await uploadPostService(data, token);
        if (res?.result) {
            navigate(`/post/${res.result.id}`);
        } else {
            console.error("Post upload failed:", res);
        }

    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <h3 className={cx('header-heading')}>Create a Post</h3>
            </div>
            <form className={cx('form')} onSubmit={handleSubmit}>
                <div className={cx('kind')}>
                    <span className={cx('kind-title')}>Language:</span>
                    <select
                        value={formData.language}
                        onChange={handleInputChange('language')}
                        className={cx('kind-select')}
                    >
                        <option value='' disabled>Language</option>
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
                            placeholder="Title"
                        />
                    </div>
                    <div className={cx('content')}>
                        <div className={cx('content-header')}>
                            <Button iconNav leftIcon={faBold} />
                            <Button iconNav leftIcon={faItalic} />
                            <Button iconNav leftIcon={faUnderline} />
                            <Button iconNav leftIcon={faImage} onClick={handleImageUpload}>
                                <input
                                    type="file"
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                />
                            </Button>
                            <Button iconNav leftIcon={faTrashCan} />
                        </div>
                        <textarea
                            value={formData.content}
                            onChange={handleInputChange('content')}
                            onBlur={handleBlur}
                            className={cx('content-text')}
                            placeholder="Content Post..."
                        ></textarea>
                    </div>
                    {showImg && (
                        <div className={cx('file')}>
                            <Image className={cx('file-img')} src={formData.img} alt="Uploaded" />
                        </div>
                    )}
                    <div className={cx('upload')}>
                        <Button round normal={!isButtonDisabled} disabled={isButtonDisabled} className={cx('upload-btn')}>
                            Post
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Upload;
