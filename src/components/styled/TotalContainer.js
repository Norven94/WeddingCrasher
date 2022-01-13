import styled from 'styled-components';

export const TotalContainer = styled.div`
    text-align: left;

    span {
        color: ${({ theme }) => theme.colors.red};
    }
    .total-big {
        font-size: ${({ theme }) => theme.fontSize.desktopL};
        font-weight: 600;
    }
    .total-small {
        font-size: ${({ theme }) => theme.fontSize.dekstopS};
    }
`