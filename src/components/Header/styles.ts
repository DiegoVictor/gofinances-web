import styled from 'styled-components';

interface ContainerProps {
  size?: 'small' | 'large';
}

export const Container = styled.div<ContainerProps>`
  background: #5636d3;
  padding: 30px 0;

  header {
    align-items: center;
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    padding: ${({ size }) => (size === 'small' ? '0 20px ' : '0 20px 150px')};
    width: 1120px;

    nav {
      a {
        color: #fff;
        font-size: 16px;
        padding: 10px 0px;
        text-decoration: none;
        transition: opacity 0.2s;

        &.active {
          border-bottom: 3px solid #ff872c;
        }

        & + a {
          margin-left: 32px;
        }

        &:hover {
          opacity: 0.6;
        }
      }
    }
  }
`;
