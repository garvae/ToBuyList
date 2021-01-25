import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import store from '../../../store/store';
import icon_tick_small from '../../../../img/nav/tick_small.svg';

type IButton = React.ButtonHTMLAttributes<HTMLButtonElement>;

const BtnBottom: React.FC<IButton> = observer(() => {
    const { t } = useTranslation();

    const location = useLocation();

    const [currentLocation, setCurrentLocation] = useState<string>(location.pathname || '/');

    useEffect((): void => {
        setCurrentLocation(location.pathname);
    }, [location.pathname]);

    return (
        <div className="container--btn-bottom">
            <div className={`hint--list-counter ${store.list_current.length === 0 ? 'no-tasks' : ''}`}>
                <span>{store.list_current.length}</span>
            </div>
            <button type="button" className="button button-big button-big--bottom">
                <Link to={`${currentLocation === '/' ? '/list' : '/'}`}>
                    <p>{currentLocation === '/' ? t('button_big_bottom_home') : t('button_big_bottom_list')}</p>
                </Link>
            </button>
            <div className={`hint-done ${store.hint_done ? 'visible' : 'hidden'}`}>
                <img src={icon_tick_small} alt="hint-done" />
            </div>
        </div>
    );
});

export default BtnBottom;
