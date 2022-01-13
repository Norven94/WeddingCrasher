import styled from 'styled-components';

export const TextLink = styled.span`
    display: flex;
        
    .text-link-span {
        text-align: ${({ align }) => align}; 
        color: ${({ theme }) => theme.colors.red};
        font-size: ${({ theme }) => theme.fontSize.xSmall};
        font-weight: 600;
        transition: .3s;
        cursor: pointer;

        @media ${({ theme }) => theme.medias.md} {  
            font-size: ${({ theme }) => theme.fontSize.small};    
        }

        &:hover {
            color: ${({ theme }) => theme.colors.purple};
        }
    }
`