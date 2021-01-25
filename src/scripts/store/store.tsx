import { action, makeAutoObservable } from 'mobx';

export interface IListItem {
    id: number;
    text: string;
    done: boolean;
}

interface IListOrder {
    order: Array<string>;
}

const store = {
    edit_on: false,

    edit_toggle: (): void => {
        store.edit_on = !store.edit_on;
    },

    hint_done: false,

    ta_isOpen: false,

    ta_value: '',

    ta_open: (): void => {
        store.ta_isOpen = true;
    },

    ta_changeValue: (e: string): void => {
        store.ta_value = e;
    },

    // e обычно используется как сокращение от event, в данном случае это id
    ta_addNote: (e: number): void => {
        store.list_current.push({
            id: e,
            text: store.ta_value,
            done: false,
        });
        store.ta_value = '';

        // Лучше разделять бизнес-логику и вью, например,
        // управлять показом hint в react или в отдельном сторе mobx
        // подробнее тут https://mobx.js.org/defining-data-stores.html
        store.hint_done = true;
        store.list_order.order.push(e.toString());
        setTimeout(() => {
            store.hint_done = false;
        }, 1000);
    },

    ta_cancel: (): void => {
        store.ta_value = '';
        store.ta_isOpen = false;
    },

    list_current: Array<IListItem>(),

    list_order: { order: Array<string>() },

    list_order_change: (e: IListOrder): void => {
        store.list_order = e;
    },

    list_item_change_text: (e: string, elId: number): void => {
        const result = store.list_current.find(({ id }) => id === elId);
        if (result) {
            result.text = e;
        }
    },

    list_item_remove: (elId: number): void => {
        const result = store.list_current.find(({ id }) => id === elId);
        if (result) {
            const index = store.list_current.indexOf(result);
            store.list_current.splice(index, 1);
        }
        const orderItem = store.list_order.order.find(item => item === elId.toString());
        if (orderItem) {
            const orderItemIndex = store.list_order.order.indexOf(orderItem);
            store.list_order.order.splice(orderItemIndex, 1);
        }
    },

    list_item_done: (e: boolean, elId: number): void => {
        const result = store.list_current.find(({ id }) => id === elId);
        if (result) {
            result.done = e;
        }
    },
};

makeAutoObservable(store, {
    edit_toggle: action,
    ta_open: action,
    ta_changeValue: action,
    ta_addNote: action,
    ta_cancel: action,
    list_item_change_text: action,
    list_item_remove: action,
    list_item_done: action,
    list_order_change: action,
});

export default store;
