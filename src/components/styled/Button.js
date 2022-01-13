import styled from 'styled-components';

export const Button = styled.button`
    padding: 10px;
    background-color: ${({ theme }) => theme.colors.red};
    width: 120px;
    border-radius: 20px;
    border: 1px solid ${({ theme }) => theme.colors.red};
    color: ${({ theme }) => theme.colors.white};
    box-shadow: 1px 1px 5px ${({ theme }) => theme.colors.boxShadow};

    &.big {
        width: 200px;
        padding: 20px 10px;
        border-radius: 40px;
        font-size: ${({ theme }) => theme.fontSize.desktopL}
    }

    &.small {
        width: 80px;
        padding: 6px 3px;
        border-radius: 20px;
        font-size: font-size: ${({ theme }) => theme.fontSize.desktopXS}
    }

    &.secondary {
        background-color: ${({ theme }) => theme.colors.white};
        color: ${({ theme }) => theme.colors.red};
    }

    &.disabled {
        background-color: $disabled;
        border-color: $disabled;
    }
`