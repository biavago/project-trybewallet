import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAPI } from '../redux/actions';

class WalletForm extends React.Component {
  state = {
    value: '',
    description: '',
    currency: '',
    paymentMethod: '',
    tag: '',
  };

  async componentDidMount() {
    const { dispatch } = this.props;
    await dispatch(fetchAPI());
  }

  handleChange = ({ target }) => {
    const { name } = target;
    this.setState(
      {
        [name]: target.value,
      },
    );
  };

  render() {
    const { value, description, currency, paymentMethod, tag } = this.state;
    const { currencies } = this.props;
    return (
      <div>
        <label htmlFor="value">
          Valor:
          <input
            data-testid="value-input"
            name="value"
            onChange={ this.handleChange }
            type="number"
            value={ value }
          />
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            data-testid="description-input"
            name="description"
            onChange={ this.handleChange }
            type="text"
            value={ description }
          />
        </label>
        <label htmlFor="currency">
          Moeda:
          <select
            data-testid="currency-input"
            name="currency"
            onChange={ this.handleChange }
            value={ currency }
          >
            {
              currencies.map((currencyOption) => (
                <option
                  key={ currencyOption }
                  value={ currencyOption }
                >
                  {currencyOption}
                </option>
              ))
            }
          </select>
        </label>
        <label htmlFor="paymentMethod">
          Método de Pagamento:
          <select
            data-testid="method-input"
            name="paymentMethod"
            onChange={ this.handleChange }
            value={ paymentMethod }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Categoria:
          <select
            data-testid="tag-input"
            name="tag"
            onChange={ this.handleChange }
            value={ tag }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
      </div>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);
