import styled from 'styled-components';

export const TextLink = styled.span`
    display: flex;
        
    .text-link-span {
        text-align: ${({ align }) => align}; 
        color: ${({ theme }) => theme.colors.red};
        font-weight: 600;
        transition: .3s;
        cursor: pointer;

        &:hover {
            color: ${({ theme }) => theme.colors.purple};
        }
    }
`