import React from 'react';
import { observer } from 'mobx-react-lite';

import store from '../../store/store';

import icon_burger_move from '../../../img/nav/burger_move_0.3.svg';
import icon_tick_small from '../../../img/nav/tick_small.svg';
import icon_cross_big from '../../../img/nav/cross_big.svg';

export interface IListItemDraggable {
    id: number;
    text: string;
    done: boolean;
}

const ListItem: React.FC<IListItemDraggable> = observer((props: IListItemDraggable) => {
    return (
        <li className="container-list-item">
            {/* -------------- draggable list button -------------- */}

            {/* <img */}
            {/*    className={`container-list-item--burger ${store.edit_on ? 'visible' : 'hidden'}`} */}
            {/*    src={icon_burger_move} */}
            {/*    alt="icon_burger_move" */}
            {/* /> */}
            <input
                type="text"
                disabled={!store.edit_on}
                minLength={1}
                defaultValue={props.text}
                onChange={e => store.list_item_change_text(e.target.value, props.id)}
            />
            <button
                type="button"
                className={`button button-cross-small ${store.edit_on ? 'visible' : 'hidden'}`}
                onClick={() => store.list_item_remove(props.id)}
            >
                <img src={icon_cross_big} alt="icon_tick_small" />
            </button>
            <div className={`container-list-item--done ${store.edit_on ? 'hidden' : 'visible'}`}>
                <input
                    type="checkbox"
                    name={`checkbox_${props.id}`}
                    id={`checkbox_${props.id}`}
                    checked={props.done}
                    onChange={e => store.list_item_done(e.target.checked, props.id)}
                />
                <label htmlFor={`checkbox_${props.id}`}>
                    <img src={icon_tick_small} alt="icon_tick_small" />
                </label>
            </div>
        </li>
    );
});

export default ListItem;
