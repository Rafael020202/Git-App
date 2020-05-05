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
    this.setState({ loading: true });

    try {
      const response = await api.get(`/repos/${newRepo}`);
      const { repositories } = this.state;

      this.setState({
        newRepo: '',
        repositories: [...repositories, { name: response.data.full_name }],
        error: false,
      });
    } catch (err) {
      this.setState({ error: true });
    }

    this.setState({ loading: false });
  };

  render() {
    const { newRepo, loading, repositories, error } = this.state;

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

          <Modal show={error} onHide={() => this.setState({ error: false })} />
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
