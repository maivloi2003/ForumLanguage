import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '~/App';
import reportWebVitals from './reportWebVitals';
import GlobalStyles from '~/components/GlobalStyles';
import { UserProvider } from '~/context/UserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <GlobalStyles>
            <UserProvider>
                <App />
            </UserProvider>
        </GlobalStyles>
    </React.StrictMode>,
);

reportWebVitals();
