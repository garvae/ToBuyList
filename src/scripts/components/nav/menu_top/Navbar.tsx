import React, { useState, useEffect } from 'react';
import useDarkMode from 'use-dark-mode';
import { get as getLs } from 'local-storage';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';

import store from '../../../store/store';

import icon_edit from '../../../../img/nav/edit.svg';
import icon_tick_big from '../../../../img/nav/tick_big.svg';
import icon_menu_dark from '../../../../img/nav/menu_dark.svg';
import icon_menu_light from '../../../../img/nav/menu_light.svg';
import icon_darkMode_dark from '../../../../img/nav/moon_dark.svg';
import icon_darkMode_light from '../../../../img/nav/moon_light.svg';

const Navbar: React.FC = observer(() => {
    const { t, i18n } = useTranslation();

    // ------------------------------ span component ------------------------------

    interface ISpanBtn {
        children: React.ReactNode;
        tabIndex: number;
        className: string;
        fn: (e: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) => void | (() => void);
    }

    const SpanBtn: React.FC<ISpanBtn> = (props: ISpanBtn) => {
        return (
            <span
                role="button"
                tabIndex={props.tabIndex}
                className={props.className}
                onClick={props.fn}
                onKeyDown={props.fn}
            >
                {props.children}
            </span>
        );
    };

    // ------------------------------ language switcher ------------------------------

    const switchLang = (): void => {
        if (i18n.language === 'ru') {
            i18n.changeLanguage('en');
        } else {
            i18n.changeLanguage('ru');
        }
    };

    // ------------------------------ dark mode ------------------------------

    const darkMode = useDarkMode(false);
    const [darkModeOn, setDarkModeOn] = useState<boolean>(darkMode.value || false);

    useEffect(() => {
        const darkModeLs = getLs('darkMode');

        if (darkModeLs) {
            setDarkModeOn(true);
            darkMode.enable();
        } else {
            setDarkModeOn(false);
            darkMode.disable();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (darkMode.value) {
            setDarkModeOn(true);
        } else {
            setDarkModeOn(false);
        }
    }, [darkMode.value]);

    // ------------------------------ menu open ------------------------------

    const [openMenu, setOpenMenu] = useState<boolean>(false);

    const clickOutMenu = (event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>): void => {
        if (!openMenu) {
            setOpenMenu(true);
            document.addEventListener(
                'click',
                (): void => {
                    setOpenMenu(false);
                },
                { once: true },
            );
        } else {
            setOpenMenu(false);
        }
        event.stopPropagation();
    };

    return (
        <nav className={`navbar ${openMenu ? 'open' : ''}`}>
            <ul>
                <li>
                    <SpanBtn tabIndex={-4} className="icon-edit" fn={store.edit_toggle}>
                        <img src={store.edit_on ? icon_tick_big : icon_edit} alt="navbar--icon-edit" />
                    </SpanBtn>
                </li>
                <li>
                    <SpanBtn tabIndex={-3} className="icon-menu" fn={e => clickOutMenu(e)}>
                        <img src={darkModeOn ? icon_menu_dark : icon_menu_light} alt="navbar--icon-menu" />
                    </SpanBtn>
                    <ul>
                        <li>
                            <SpanBtn tabIndex={-1} className="icon-darkMode" fn={darkMode.toggle}>
                                <img
                                    src={darkModeOn ? icon_darkMode_dark : icon_darkMode_light}
                                    alt="navbar--icon-darkMode"
                                />
                            </SpanBtn>
                        </li>
                        <li>
                            <SpanBtn tabIndex={-2} className="icon-lang" fn={switchLang}>
                                <p>{t('navbar_lang')}</p>
                            </SpanBtn>
                        </li>
                    </ul>
                </li>
            </ul>
        </nav>
    );
});

export default Navbar;
