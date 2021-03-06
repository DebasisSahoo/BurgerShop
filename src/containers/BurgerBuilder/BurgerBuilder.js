import React, {Component} from 'react';
import Aux from '../../hoc/Hoc';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {

    // constructor(props) {
    //     super(props)
    //     this.state = {...}
    // }

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false
    }
    updatePurchaseState = (updatedIngredients) => {
        const sum = Object.keys(updatedIngredients)
                        .map(igKey => {
                            return updatedIngredients[igKey]
                        })
                        .reduce((sum, el) => {
                            return sum + el;
                        },0);
        this.setState({
            purchasable: sum > 0
        })
    }
    addIngredientHandler = (type) => {

        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type]
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        })
        this.updatePurchaseState(updatedIngredients);
    }
    removeIngredientHandler = (type) => {

        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0){ return }
        const newCount = oldCount - 1;
        const ingredientPrice = INGREDIENT_PRICES[type];
        const newPrice = this.state.totalPrice - ingredientPrice;
        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type] = newCount;
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        })
        this.updatePurchaseState(updatedIngredients);
    }
    purchasingHandler = () => {
        this.setState({ purchasing: true })
    }
    backdropCancelHandler = () => {
        this.setState({ purchasing: false })
    }
    purchasingCancelHandler = () => {
        this.setState({ purchasing: false })
    }
    purchasingContinueHandler = () => {
        alert('you continue !')
    }
    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for(let key in disabledInfo)
        {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        return(
           <Aux>
               <Modal 
                    show={this.state.purchasing} 
                    backdropCancel = {this.backdropCancelHandler}>

                   <OrderSummary 
                        ingredients = {this.state.ingredients}
                        canceled = {this.purchasingCancelHandler}
                        continued = {this.purchasingContinueHandler}
                        price = {this.state.totalPrice.toFixed(2)} />
                </Modal>
               <Burger ingredients = {this.state.ingredients}/>
               <BuildControls 
                ingredientAdded = {this.addIngredientHandler}
                ingredientsRemoved = {this.removeIngredientHandler}
                disabled = {disabledInfo}
                price = { this.state.totalPrice }
                purchasable = {this.state.purchasable}
                order = {this.purchasingHandler}/>
           </Aux>
        )
    }
}
export default BurgerBuilder;