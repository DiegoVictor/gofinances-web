import React from 'react';
import { Link } from 'react-router-dom';

import Logo from '../../assets/logo.svg';
import { Container } from './styles';

interface HeaderProps {
  size?: 'small' | 'large';
  currentPage?: string;
}

const Header: React.FC<HeaderProps> = ({
  size = 'large',
  currentPage,
}: HeaderProps) => (
  <Container size={size}>
    <header>
      <img src={Logo} alt="GoFinances" />
      <nav>
        <Link to="/" className={!currentPage ? 'active' : ''}>
          Listagem
        </Link>
        <Link to="/import" className={currentPage === 'import' ? 'active' : ''}>
          Importar
        </Link>
      </nav>
    </header>
  </Container>
);

export default Header;
