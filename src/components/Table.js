import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpenses } from '../redux/actions';

class Table extends Component {
  render() {
    const { expenses, dispatch } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={ expense.id }>
              <td>{expense.description}</td>
              <td>{expense.tag}</td>
              <td>{expense.method}</td>
              <td>{Number(expense.value).toFixed(2)}</td>
              <td>{expense.currency}</td>
              <td>
                {Number(Object.entries(expense.exchangeRates)
                  .find((moeda) => moeda[1].code === expense.currency)[1].ask)
                  .toFixed(2)}
              </td>
              <td>
                {(expense.value * Number(Object.entries(expense.exchangeRates)
                  .find((moeda) => moeda[1].code === expense.currency)[1].ask))
                  .toFixed(2)}
              </td>
              <td>
                {Object.entries(expense.exchangeRates)
                  .find((moeda) => moeda[1].code === expense.currency)[1].name}
              </td>
              <td>
                <button
                  data-testid="delete-btn"
                  onClick={ () => dispatch(deleteExpenses(expense.id)) }
                  type="button"
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
