import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  updateExpenses = () => {
    const { expenses } = this.props;
    if (expenses.length > 0) {
      return expenses.reduce((cont, { value, currency, exchangeRates }) => {
        const totalExpenses = value * Number(exchangeRates[currency].ask);
        return totalExpenses + cont;
      }, 0);
    }
  };

  render() {
    const { email } = this.props;
    return (
      <div>
        <h1>$ TrybeWallet $</h1>
        <h2 data-testid="email-field">
          Usuário:
          { email }
        </h2>
        <h3 data-testid="total-field">
          { this.updateExpenses() ? this.updateExpenses().toFixed(2) : '0.00' }
        </h3>
        <h3 data-testid="header-currency-field"> BRL</h3>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  })).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
