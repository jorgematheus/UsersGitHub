import React, { Component } from 'react';
import { ActivityIndicator, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  StarsList,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
} from './styles';
import api from '../../services/api';

export default class User extends Component {
  state = {
    stars: [],
    page: 1,
    loading: false,
    refreshing: false,
  };

  async componentDidMount() {
    this.setState({ loading: true });
    this.handleLoadStars();
  }

  handleLoadStars = async () => {
    const { page } = this.state;

    const user = this.props.route.params.item;

    const response = await api.get(`/users/${user.login}/starred`, {
      params: {
        page,
      },
    });

    console.log(response.data);

    this.setState({ stars: response.data, loading: false, refreshing: false });
  };

  handleLoadMore = async () => {
    await this.setState({
      page: this.state.page + 1,
      loading: true,
    });

    const { page, stars } = this.state;
    const user = this.props.route.params.item;

    const response = await api.get(`/users/${user.login}/starred`, {
      params: {
        page,
      },
    });

    if (response.data.length !== 0) {
      this.setState({
        stars: [...stars, ...response.data],
        loading: false,
        refreshing: false,
      });
    }

    this.setState({ loading: false, refreshing: false });
  };

  handleRefreshList = async () => {
    await this.setState({ page: 1, refreshing: true, loading: false });

    this.handleLoadStars();
  };

  handleClick = () => {
    console.log('clicou');
  };

  render() {
    const user = this.props.route.params.item;
    const { navigation } = this.props;
    const { stars, loading, refreshing } = this.state;
    return (
      <Container>
        <Header>
          <Avatar source={{ uri: user.avatar }} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>
        <StarsList
          data={stars}
          keyExtractor={star => String(star.id)}
          onEndReachedThreshold={0.2} // Carrega mais itens quando chegar em 20% do fim
          onEndReached={() => this.handleLoadMore()} // Função que carrega mais itens
          onRefresh={() => this.handleRefreshList()} // Função dispara quando o usuário arrasta a lista pra baixo
          refreshing={refreshing} // Variável que armazena um estado true/false que representa se a lista está atualizando
          renderItem={({ item }) => (
            <Starred>
              <OwnerAvatar source={{ uri: item.owner.avatar_url || '' }} />
              <Info>
                <TouchableOpacity>
                  <Title
                    onPress={() => navigation.navigate('ContentStar', { item })}
                  >
                    {item.name}
                  </Title>
                </TouchableOpacity>
                <Author>{item.owner.login}</Author>
              </Info>
            </Starred>
          )}
        />
        {loading ? (
          <ActivityIndicator size="large" color="#7159c1" />
        ) : (
          <Text />
        )}
      </Container>
    );
  }
}
