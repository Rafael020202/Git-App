import styled from 'styled-components';

export const Loading = styled.div`
  font-size: 30px;
  font-weight: bold;
  color: #fff;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Owner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    margin-top: 20px;
    width: 120px;
    border-radius: 50%;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    color: #666;
    font-size: 14px;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }

  a {
    text-decoration: none;
    color: #7159c1;
    font-size: 14px;
  }
`;

export const IssueList = styled.ul`
  padding-top: 30px;
  margin-top: 30px;
  border-top: 1px solid #eee;
  list-style: none;

  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;
    box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.1);

    & + li {
      margin-top: 10px;
    }

    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 2px solid #eee;
    }

    div {
      flex: 1;
      margin-left: 15px;

      strong {
        font-size: 16px;

        a {
          text-decoration: none;
          color: #333;

          &:hover {
            color: #7159c1;
          }
        }

        span {
          background: #eee;
          color: #333;
          border-radius: 2px;
          font-size: 12px;
          font-weight: 600;
          height: 20px;
          padding: 3px 4px;
          margin-left: 10px;
        }
      }

      p {
        margin-top: 5px;
        font-size: 12px;
        color: #999;
      }
    }
  }
`;
// 1..0_241
