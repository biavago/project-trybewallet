import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveEmail } from '../redux/actions/index';

class Login extends React.Component {
  state = {
    email: '',
    isDisabled: true,
    password: '',
  };

  validationFunction = () => {
    const { email, password } = this.state;
    const emailRegexTest = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
    const minLenght = 6;
    const passwordValidation = password.length >= minLenght;
    this.setState({
      isDisabled: !(emailRegexTest && passwordValidation),
    });
  };

  handleChange = ({ target }) => {
    const { name } = target;
    this.setState(
      {
        [name]: target.value,
      },
      this.validationFunction,
    );
  };

  handleClick = () => {
    const { email } = this.state;
    const { history, dispatch } = this.props;
    dispatch(saveEmail(email));
    history.push('/carteira');
  };

  render() {
    const { isDisabled } = this.state;
    return (
      <div>
        <input
          data-testid="email-input"
          name="email"
          onChange={ this.handleChange }
          placeholder="email@email.com"
          type="email"
        />
        <input
          data-testid="password-input"
          name="password"
          onChange={ this.handleChange }
          placeholder="Senha"
          type="password"
        />
        <button
          disabled={ isDisabled }
          onClick={ this.handleClick }
          type="button"
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
