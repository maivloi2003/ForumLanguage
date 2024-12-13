// Routes Config
import routesConfig from '~/config/routes'

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
    { path: routesConfig.home, component: Home },
    { path: routesConfig.login, component: Login, layout: null },
    { path: routesConfig.register, component: Register, layout: null },
    { path: routesConfig.forgotPassword, component: ForgotPassword, layout: null },
    { path: routesConfig.resetPassword, component: ResetPassword, layout: null },
    { path: routesConfig.confirmEmail, component: ConfirmEmail, layout: null },
];

const privateRoutes = [
    { path: routesConfig.setting, component: Setting, layout: HeaderOnly },
    { path: routesConfig.profile, component: Profile, layout: HeaderOnly },
    { path: routesConfig.upload, component: Upload, layout: HeaderOnly },
    { path: routesConfig.activeAccount, component: ActiveAccount, layout: null },
    { path: routesConfig.sendEmail, component: SendEmail, layout: null },
    { path: routesConfig.postDetail, component: PostDetail },
];

export { publicRoutes, privateRoutes };
