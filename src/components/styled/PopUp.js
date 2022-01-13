import styled from 'styled-components';

export const PopUp = styled.div`
    z-index: 2;
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    background-color: ${({ theme }) => theme.colors.boxShadow};
    display: flex;
    justify-content: center;
    align-items: center;

    .delete-box,
    .share-box {
        background-color: ${({ theme }) => theme.colors.white};
        border-radius: 20px;

        input {
            width: 240px;
        }
    }
`