import styled from 'styled-components';

export const Heading = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 50px;

    
    .album-name-container {   
        display: flex;
        justify-content: center;
        align-items: center;

        h1 {
            margin: 0;
            font-size: ${({ theme }) => theme.fontSize.xLarge};
            position: relative;
        }
    }
`
