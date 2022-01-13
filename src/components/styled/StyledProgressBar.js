import styled from 'styled-components';

export const StyledProgressBar = styled.div`
    height: 30px;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.gray};
    border-radius: 50px;  
    box-shadow: 1px 1px 4px #00000050;

    .done-styles {
        height: 100%;
        width: ${({completed}) => completed}%;
        background-color: ${({ theme }) => theme.colors.red};
        border-radius: inherit;
        text-align: right;
        transition: width 1s ease-in-out;
        display: flex;
        justify-content: flex-end;
        align-items: center;

        .completed-span {
            padding: 20px;
            color: ${({ theme }) => theme.colors.white};
            font-weight: bold;
            font-size: ${({ theme }) => theme.fontSize.xSmall};
        }
    }
`