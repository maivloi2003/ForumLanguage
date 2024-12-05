// Layouts
import HeaderOnly from '~/components/Layouts/HeaderOnly';

// Pages
import Home from '~/pages/Home';
import Login from '~/pages/Login';
import Setting from '~/pages/Setting';
import Profile from '~/pages/Profile';
import Register from '~/pages/Register';
import Upload from '~/pages/Upload';
import ActiveAccount from '~/pages/ActiveAccount';
import ForgotPassword from '~/pages/ForgotPassword';
import SendEmail from '~/pages/SendEmail';
import ConfirmEmail from '~/pages/ConfirmEmail';
import PostDetail from '~/pages/PostDetail';
import ResetPassword from '~/pages/ResetPassword';

const publicRoutes = [
    { path: '/ForumLanguage/', component: Home },
    { path: '/ForumLanguage/login', component: Login, layout: null },
    { path: '/ForumLanguage/register', component: Register, layout: null },
    { path: '/ForumLanguage/forgotPassword', component: ForgotPassword, layout: null },
    { path: '/ForumLanguage/resetPassword', component: ResetPassword, layout: null },
    { path: '/ForumLanguage/confirmEmail', component: ConfirmEmail, layout: null },
];

const privateRoutes = [
    { path: '/ForumLanguage/setting', component: Setting, layout: HeaderOnly },
    { path: '/ForumLanguage/users/:id_user', component: Profile, layout: HeaderOnly },
    { path: '/ForumLanguage/upload', component: Upload, layout: HeaderOnly },
    { path: '/ForumLanguage/activeAccount', component: ActiveAccount, layout: null },
    { path: '/ForumLanguage/sendEmail', component: SendEmail, layout: null },
    { path: '/ForumLanguage/post/:id_post', component: PostDetail },
];

export { publicRoutes, privateRoutes };
