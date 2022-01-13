import styled from 'styled-components';

export const StyledDropZone = styled.div`
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: 4px;
    border: 2px dashed ${({ theme }) => theme.colors.red};
    text-align: center;
    padding: 1.5rem 1rem;
    margin-bottom: 1rem;

    p {
        font-size: ${({ theme }) => theme.fontSize.large};
        color: ${({ theme }) => theme.colors.red};
    }
`