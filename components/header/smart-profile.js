import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import Auth from '../auth/auth';

import Profile from './profile';

export default class SmartProfile extends PureComponent {
  static Size = Profile.Size;

  static propTypes = {
    auth: PropTypes.instanceOf(Auth).isRequired,
    className: PropTypes.string,
    translations: Profile.propTypes.translations,
    size: Profile.propTypes.size
  };

  state = {
    user: null,
    size: Profile.defaultProps.size
  }

  componentDidMount() {
    this.requestUser();
  }

  login = async () => {
    this.setState({loading: true});

    await this.props.auth.login();

    this.setState({loading: false});
  };

  logout = () => this.props.auth.logout();

  async requestUser() {
    try {
      const {auth} = this.props;
      const user = await auth.requestUser();
      this.setState({user});

      auth.addListener('userChange', newUser => {
        this.setState({user: newUser});
      });
    } catch (e) {
      // noop
    }
  }

  render() {
    const {user, loading} = this.state;
    const {auth, ...props} = this.props;

    return (
      <Profile
        onLogin={this.login}
        onLogout={this.logout}
        loading={loading}
        user={user}
        profileUrl={user ? `${auth.config.serverUri}users/${user.id}` : ''}
        {...props}
      />
    );
  }
}
