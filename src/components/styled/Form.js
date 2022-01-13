import styled from 'styled-components';

export const Form = styled.form`
    max-width: 100%;

    .input-container {
        flex-direction: column; 

        input {
            width: 250px;
        }

        @media ${({ theme }) => theme.medias.md} {
            flex-direction: row;       
        }
    }

    .button-container {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
`