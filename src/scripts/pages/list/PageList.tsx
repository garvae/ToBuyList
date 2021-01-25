import React from 'react';
import { observer } from 'mobx-react-lite';
import { SortablePane, Pane } from 'react-sortable-pane';

import store from '../../store/store';
import ListItem from './ListItem';
import ScrollbarWrapper from '../../components/nav/scrollbars/Scrollbar';

// ----------------------------------- clear

const PageList: React.FC = observer(() => {
    const list = store.list_current;

    return (
        <div className="page--list">
            <div className="container-list">
                <ul>
                    <ScrollbarWrapper>
                        {list.map(({ done, text, id }) => (
                            <ListItem key={id} id={id} text={text} done={done} />
                        ))}
                    </ScrollbarWrapper>
                </ul>
            </div>
        </div>
    );
});

// ----------------------------------- graggable list

// const PageList: React.FC = observer(() => {
//     const list = store.list_current;
//
//     const panes = list.map(({ done, text, id }) => (
//         <Pane key={id} resizable={{ x: false, y: false, xy: false }}>
//             <ListItem key={id} id={id} text={text} done={done} />
//         </Pane>
//     ));
//
//     return (
//         <div className="page--list">
//             <div className="container-list">
//                 <ScrollbarWrapper>
//                     <ul>
//                         <SortablePane
//                             order={store.list_order.order}
//                             dragHandleClassName="container-list-item--burger"
//                             direction="vertical"
//                             // disableEffect
//                             className="sortable-pane-item"
//                             onOrderChange={order => {
//                                 store.list_order_change({ order });
//                             }}
//                             // onDragStop={e => console.log(e)}
//                         >
//                             {panes}
//                         </SortablePane>
//                     </ul>
//                 </ScrollbarWrapper>
//             </div>
//         </div>
//     );
// });

export default PageList;
