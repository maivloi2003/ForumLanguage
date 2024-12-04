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
    { path: '/', component: Home },
    { path: '/login', component: Login, layout: null },
    { path: '/register', component: Register, layout: null },
    { path: '/forgotPassword', component: ForgotPassword, layout: null },
    { path: '/resetPassword', component: ResetPassword, layout: null },
    { path: '/confirmEmail', component: ConfirmEmail, layout: null },
];

const privateRoutes = [
    { path: '/setting', component: Setting, layout: HeaderOnly },
    { path: '/users/:id_user', component: Profile, layout: HeaderOnly },
    { path: '/upload', component: Upload, layout: HeaderOnly },
    { path: '/activeAccount', component: ActiveAccount, layout: null },
    { path: '/sendEmail', component: SendEmail, layout: null },
    { path: '/post/:id_post', component: PostDetail },
];

export { publicRoutes, privateRoutes };
