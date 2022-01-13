import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    * {
        box-sizing: border-box;
    }

    body {
        font-family: 'arial';
        margin: 0;
        text-align: center;
    }

    img {
        max-width: 100%;
    } 
`

export default GlobalStyles