import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import DefaultLayout from './Layouts/DefaultLayout';

import global_fr from "../translations/fr/global.json";
import global_en from "../translations/en/global.json";
import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';

i18next.init({
    interpolation: {escapeValue: true},
    lng: (document.cookie.split('; ').find(row => row.startsWith('lng=')) || 'lng=fr').split('=')[1],
    resources: {
        fr: {
            global: global_fr
        },
        en: {
            global: global_en
        }
    }
})

const appName = import.meta.env.VITE_APP_NAME || 'La faim des temps';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => {
        const pages = import.meta.glob("./Pages/**/*.jsx", { eager: true });
        let page = pages[`./Pages/${name}.jsx`];
        page.default.layout = page.default.layout || ((page) => <DefaultLayout children={page} />);
        return page;
    },
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <I18nextProvider i18n={i18next}>
                <App {...props} />
            </I18nextProvider>
        );
    },
    progress: {
        color: '#4B5563',
    },
});
