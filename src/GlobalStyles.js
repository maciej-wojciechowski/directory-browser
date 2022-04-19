import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    body {
        --hover-color: #5bcd6e;
        font-family: 'Roboto', sans-serif;
        background-color: #525659;
        color: #fff;
    }
    p {
        font-weight: 500;
    }
`;

export default GlobalStyles;
