import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { email } = this.props;
    return (
      <div>
        <h1>$ TrybeWallet $</h1>
        <h2 data-testid="email-field">
          Usuário:
          { email }
        </h2>
        <h3 data-testid="total-field">0</h3>
        <h3 data-testid="header-currency-field"> BRL</h3>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(Header);
