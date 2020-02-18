import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Keyboard, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../../services/api';

import {
  Container,
  Form,
  Input,
  SubmitButton,
  List,
  User,
  Avatar,
  Name,
  Bio,
  ProfileButton,
  ProfileButtonText,
  UserNotFound,
} from './styles';

export default class Main extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    newUser: '',
    users: [],
    loading: false,
    error: false,
  };

  // eslint-disable-next-line react/static-property-placement
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  };

  async componentDidMount() {
    const users = await AsyncStorage.getItem('users');
    if (users) {
      this.setState({ users: JSON.parse(users) });
    }
  }

  componentDidUpdate(_, prevState) {
    const { users } = this.state;

    if (prevState.users !== users) {
      AsyncStorage.setItem('users', JSON.stringify(users));
    }
  }

  handleAddUser = async () => {
    const { newUser, users } = this.state;

    this.setState({ loading: true });

    if (newUser !== '') {
      try {
        const response = await api.get(`/users/${newUser}`);
        const data = {
          name: response.data.name,
          login: response.data.login,
          bio: response.data.bio,
          avatar: response.data.avatar_url,
        };

        this.setState({
          users: [...users, data],
          newUser: '',
          loading: false,
          error: false,
        });

        Keyboard.dismiss();
      } catch (error) {
        this.setState({ error: true, loading: false });
      }
    } else {
      this.setState({ loading: false });
    }
  };

  render() {
    const { navigation } = this.props;
    const { users, newUser, loading, error } = this.state;
    return (
      <Container>
        <Form>
          <Input
            error={error}
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Adicionar usuário"
            value={newUser}
            onChangeText={text => this.setState({ newUser: text })}
            returnKeyType="send"
            onSubmitEditing={this.handleAddUser}
          />
          <SubmitButton loading={loading} onPress={this.handleAddUser}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Icon name="add" size={20} color="#fff" />
            )}
          </SubmitButton>
        </Form>
        {error ? <UserNotFound>User not found!</UserNotFound> : null}
        <List
          data={users}
          keyExtractor={user => user.login}
          renderItem={({ item }) => (
            <User>
              <Avatar source={{ uri: item.avatar }} />
              <Name>{item.name || item.login}</Name>
              <Bio>{item.bio}</Bio>

              <ProfileButton
                // eslint-disable-next-line react/prop-types
                onPress={() => navigation.navigate('User', { item })}
              >
                <ProfileButtonText>Ver Perfil</ProfileButtonText>
              </ProfileButton>
            </User>
          )}
        />
      </Container>
    );
  }
}
