import React from 'react';
import Aux from '../../hoc/Hoc';
import './Layout.css'
const layout = (props) => (
    <Aux>
        <div>Toolbar, sideDrawr, backdrop</div>
        <main className = 'content'>
            {props.children}
        </main>
    </Aux>
)

export default layout;