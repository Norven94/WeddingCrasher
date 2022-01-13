import styled from 'styled-components';

export const StyledNavbar = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100vw;
    height: 70px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray};

    .navbar-logo {
        text-decoration: none;
        font-weight: 800;
        color: ${({ theme }) => theme.colors.red};
    }

`