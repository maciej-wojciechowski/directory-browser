import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    body {
        --hover-color: #5bcd6e;
        --main-white: #dddcdc;
        font-family: 'Roboto', sans-serif;
        background-color: #525659;
        color: var(--main-white);
    }
    p {
        font-weight: 500;
    }
`;

export default GlobalStyles;
