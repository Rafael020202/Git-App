import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Modal from '../../components/Modal';
import { Form, SubmitButton, List } from './style';
import Container from '../../components/Container';
import api from '../../services/api';

class Main extends Component {
  state = {
    newRepo: '',
    messageError: '',
    repositories: [],
    loading: false,
    error: false,
  };

  componentDidMount() {
    const repositories = localStorage.getItem('repositories');

    if (repositories) {
      this.setState({ repositories: JSON.parse(repositories) });
    }
  }

  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;

    if (prevState.repositories !== repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }

  handleChange = (e) => {
    this.setState({ newRepo: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const { newRepo } = this.state;
    const { repositories } = this.state;
    const repository = repositories.find((repo) => repo.name === newRepo);

    if (repository) {
      this.setState({
        error: true,
        messageError: 'Repositorio já existente',
        newRepo: '',
      });
      return;
    }

    this.setState({ loading: true });

    try {
      const response = await api.get(`/repos/${newRepo}`);
      this.setState({
        newRepo: '',
        repositories: [...repositories, { name: response.data.full_name }],
        error: false,
      });
    } catch (err) {
      this.setState({ error: true, messageError: 'Repositório inexistente' });
    }

    this.setState({ loading: false, newRepo: '' });
  };

  render() {
    const { newRepo, loading, repositories, error, messageError } = this.state;

    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositórios
        </h1>

        <Form onSubmit={this.handleSubmit} error={error}>
          <input
            type="text"
            placeholder="Adicionar repositórios"
            value={newRepo}
            onChange={this.handleChange}
          />

          <SubmitButton loading={loading}>
            {loading ? (
              <FaSpinner color="#FFF" size={14} />
            ) : (
              <FaPlus color="#FFF" size={14} />
            )}
          </SubmitButton>

          <Modal
            show={error}
            onHide={() => this.setState({ error: false })}
            message={messageError}
          />
        </Form>

        <List>
          {repositories.map((repo) => (
            <li key={repo.name}>
              <span>{repo.name}</span>
              <Link to={`/repository/${encodeURIComponent(repo.name)}`}>
                Detalhes
              </Link>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}

export default Main;
