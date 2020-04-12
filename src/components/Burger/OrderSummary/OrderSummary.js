import React from 'react';

import Aux from '../../../hoc/Hoc';
import Button from '../../UI/Button/Button'

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
                                .map(igKey => {
                                    return <li key={igKey}>
                                                <span style={{textTransform: "capitalize"}}>{igKey}</span> : {props.ingredients[igKey]}
                                            </li>
                                })
    return(
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price : {props.price}</strong></p>
            <p>continue to checkout ?</p>
            
            <Button btnType = "Danger" clicked = {props.canceled}>CANCEL</Button>
            <Button btnType = "Success" clicked = {props.continued}>CONTINUE</Button>
        </Aux>
    )

}

export default orderSummary;