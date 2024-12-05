import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { publicRoutes, privateRoutes } from '~/routes';
import { DefaultLayout } from '~/components/Layouts';

const isAuthenticated = () => {
    return !!localStorage.getItem('authToken');
};

const PrivateRoute = ({ children }) => {
    return isAuthenticated() ? children : <Navigate to="/ForumLanguage/login" />;
};

function App() {

    return (
        <Router >
            <div className="App">
                <Routes>
                    {/* Public Routes */}
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;

                        let Layout = DefaultLayout;

                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }

                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}

                    {/* Private Routes */}
                    {privateRoutes.map((route, index) => {
                        const Page = route.component;

                        let Layout = DefaultLayout;
                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }

                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <PrivateRoute>
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    </PrivateRoute>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
