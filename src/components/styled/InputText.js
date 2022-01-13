import styled from 'styled-components';

export const InputText = styled.input`
    padding: 10px 16px;
    border-color: ${({ theme }) => theme.colors.grayLight};
    border-radius: 20px;
    font-size: $desktop-small;

    &::placeholder {
        color: ${({ theme }) => theme.colors.grayLight};
    }

    .errorInput {
        border-color: ${({ theme }) => theme.colors.red};
    
        &::placeholder {
            color: ${({ theme }) => theme.colors.red};
        }
    }
`