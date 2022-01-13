import styled from 'styled-components';

export const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 90vw;
    margin: auto;

    @media ${({ theme }) => theme.medias.md} {
        width: 80vw;        
    }
`