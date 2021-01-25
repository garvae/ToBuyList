import React from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import store from '../../store/store';

import icon_plus_big from '../../../img/nav/plus_big.svg';
import icon_cross_big from '../../../img/nav/cross_big.svg';

const PageHome: React.FC = observer(() => {
    const { t } = useTranslation();

    const newId = Number(new Date().valueOf().toString().slice(-4));

    return (
        <div className="page-main">
            <div className={`page-main--greeting ${store.ta_isOpen ? 'hidden' : 'visible'}`}>
                <p>{t('page_main_greeting')}</p>
            </div>
            <div className={`container-note ${store.ta_isOpen ? 'visible' : 'hidden'}`}>
                <textarea
                    className="container-note--field"
                    value={store.ta_value || ''}
                    placeholder={t('page_main_note_container_placeholder')}
                    onChange={e => store.ta_changeValue(e.target.value)}
                />
                <div className="container-note-buttons">
                    <button type="button" className="button container-note-buttons--cancel" onClick={store.ta_cancel}>
                        <img src={icon_cross_big} alt="icon_cross_big" />
                    </button>
                    <button
                        type="button"
                        className={`button container-note-buttons--add ${store.ta_value.length < 1 ? 'inactive' : ''}`}
                        onClick={() => store.ta_addNote(newId)}
                    >
                        <img src={icon_plus_big} alt="icon_plus_big_mid" />
                    </button>
                </div>
            </div>
            <button
                type="button"
                className={`button button-round-big ${store.ta_isOpen ? 'hidden' : 'visible'}`}
                onClick={store.ta_open}
            >
                <img src={icon_plus_big} alt="icon_plus_big" />
            </button>
        </div>
    );
});

export default PageHome;
