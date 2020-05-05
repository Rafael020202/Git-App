import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Container from '../../components/Container';
import { Loading, Owner, IssueList, Paging } from './style';
import api from '../../services/api';

export default class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    repository: {},
    issues: [],
    loading: true,
    page: 0,
  };

  componentDidMount() {
    this.load();
  }

  load = async (page = 0) => {
    const { match } = this.props;
    const repoName = decodeURIComponent(match.params.repository);
    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: 'open',
          per_page: 5,
          page,
        },
      }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
      page,
    });
  };

  handlePagination = (e) => {
    const { name } = e.target;
    const { page } = this.state;
    let pageNumber;

    if (name === 'prev' && page > 0) {
      pageNumber = page - 1;
      this.load(pageNumber);
    } else {
      pageNumber = page + 1;
      this.load(pageNumber);
    }
  };

  render() {
    const { repository, loading, issues } = this.state;

    if (loading) {
      return <Loading>Carregando...</Loading>;
    }

    return (
      <>
        <Container>
          <Owner>
            <Link to="/">Voltar aos repositórios</Link>

            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <h1>{repository.name}</h1>
            <p>{repository.description}</p>
          </Owner>

          <IssueList>
            {issues.map((issue) => (
              <li key={String(issue.id)}>
                <img src={issue.user.avatar_url} alt={issue.user.login} />
                <div>
                  <strong>
                    <a href={issue.html_url}>{issue.title}</a>
                    {issue.labels.map((label) => (
                      <span key={String(label.id)}>{label.name}</span>
                    ))}
                  </strong>

                  <p>{issue.user.login}</p>
                </div>
              </li>
            ))}

            <Paging>
              <button type="button" name="prev" onClick={this.handlePagination}>
                Prev
              </button>

              <button type="button" name="next" onClick={this.handlePagination}>
                Next
              </button>
            </Paging>
          </IssueList>
        </Container>
      </>
    );
  }
}
