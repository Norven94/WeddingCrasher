import styled from 'styled-components';

export const ImageCard = styled.div`
    position: relative;
    border: 3px solid transparent;
    border-radius: 10px;
    overflow: hidden;
    transition: .3s;

    &.selected {
        border: 3px solid ${({ theme }) => theme.colors.green};
    }
    
    &:hover {
        border: 3px solid ${({ theme }) => theme.colors.purple};
    }

    &.keep {
        border: 3px solid ${({ theme }) => theme.colors.green};
    }

    &.remove {
        border: 3px solid ${({ theme }) => theme.colors.red};
    }
    
    img {
        width: 100%;
    }
    
    .fa-icon, 
    .review-btn {
        z-index: 1;
        position: absolute;
        top: 15px;
        right: 15px;
    }

    .select-btn {
        z-index: 1;
        position: absolute;
        top: 10px;
        left: 10px;

        input {
            -webkit-appearance: none;
            background-color: ${({ theme }) => theme.colors.white};
            border: 1px solid ${({ theme }) => theme.colors.red};
            padding: 18px;
            border-radius: 18px;
            transition: .3s;

            &:checked {
                background-color: ${({ theme }) => theme.colors.red};
                border: 1px solid ${({ theme }) => theme.colors.red};
                position: relative;
                
                &:after {
                    content: "\\2714";
                    font-size: 18px;
                    position: absolute;
                    top: 52%;
                    left: 52%;
                    transform: translate(-50%, -50%);
                    color: ${({ theme }) => theme.colors.white};
                }
            }

        }
    }

    .vote-overlay { 
        z-index: 1;
        position: absolute;
        background-color: ${({ theme }) => theme.colors.boxShadow};
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .fa-icon {
            position: absolute;
            top: 15px;
            right: 15px;
            z-index: 2;
        }

        .vote-box {
            width: 150px;
            background-color: ${({ theme }) => theme.colors.white};
            border-radius: 20px;
            padding: 10px 15px;
            box-shadow: 1px 1px 10px ${({ theme }) => theme.colors.boxShadow};
            position: relative;

            @media ${({ theme }) => theme.medias.lg} {
                width: 250px;
                padding: 20px 30px;
            }

            p {
                font-size: ${({ theme }) => theme.fontSize.xSmall};
                margin: 10 0 0 0;
            }

            .btn-box {
                display: flex;
                justify-content: center;

                @media ${({ theme }) => theme.medias.lg} {
                    flex-direction: row;       
                }
            }
        }
    }
`