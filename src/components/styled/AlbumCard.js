import styled from 'styled-components';

export const AlbumCard = styled.div`
    border: 1px solid ${({ theme }) => theme.colors.red};
    border-radius: 10px;
    box-shadow: 1px 1px 5px ${({ theme }) => theme.colors.boxShadow};
    transition: .5s;
    cursor: pointer;

    &:hover {
        border: 1px solid ${({ theme }) => theme.colors.green};
    }
`