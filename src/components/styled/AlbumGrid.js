import styled from 'styled-components';

export const AlbumGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    column-gap: 20px;
    
    @media ${({ theme }) => theme.medias.md} {
        grid-template-columns: 1fr 1fr 1fr;      
    }
`