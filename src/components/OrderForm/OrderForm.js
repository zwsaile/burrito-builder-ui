import React, { Component } from 'react';
import { submitOrders } from '../../apiCalls';

class OrderForm extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      name: '',
      ingredients: []
    };
  }


  handleSubmit = e => {
    if (!this.state.name) {
      return
    } else if (!this.state.ingredients.length) {
      return
    } else {
      submitOrders({name: this.state.name, ingredients: this.state.ingredients})
      this.clearInputs();
    }
  }

  handleIngredientChange = (e, newItems) => {
    e.preventDefault();
    this.setState(prevState => ({
      ingredients: [...prevState.ingredients, newItems]
    }))
  }

  handleNameChange = (e, newName) => {
    e.preventDefault();
    this.setState({name: newName})
  }

  clearInputs = () => {
    this.setState({name: '', ingredients: []});
  }

  render() {
    const possibleIngredients = ['beans', 'steak', 'carnitas', 'sofritas', 'lettuce', 'queso fresco', 'pico de gallo', 'hot sauce', 'guacamole', 'jalapenos', 'cilantro', 'sour cream'];
    const ingredientButtons = possibleIngredients.map(ingredient => {
      return (
        <button className={ingredient} key={ingredient} name={ingredient} onClick={e => this.handleIngredientChange(e, e.target.innerText)}>
          {ingredient}
        </button>
      )
    });

    return (
      <form>
        <input
          className='form-input'
          type='text'
          placeholder='Name'
          name='name'
          value={this.state.name}
          onChange={e => this.handleNameChange(e, e.target.value)}
        />

        { ingredientButtons }

        <p className='order-list'>Order: { this.state.ingredients.join(', ') || 'Nothing selected' }</p>

        <button className='submit-btn' onClick={e => this.handleSubmit(e)}>
          Submit Order
        </button>
      </form>
    )
  }
}

export default OrderForm;
