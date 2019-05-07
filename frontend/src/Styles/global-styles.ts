import { createGlobalStyle } from "./typed-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css?family=Maven+Pro');
    @import url('https://fonts.googleapis.com/css?family=Qwigley');
    
    ${reset};
    * {
        box-sizing: border-box;
    }
    body{
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif, 'Qwigley';
        background-color: ${props => props.theme.bgColor};
        color: ${props => props.theme.whiteColor};
        font-size: 12px;
        font-weight: 0
    }
    a{ 
        color:inherit;
        text-decoration:none;
    }
    input, textarea, button{
        &:active,
        &:focus{
            outline:none;
        }
    }
    svg{
        fill:#262626;
    }
    h1,h2,h3,h4,h5,h6{
        font-family: 'Maven Pro', sans-serif;
    }
    .pac-container {
        border-radius: 0 0 5px 5px;
        z-index: 1000000000;
        background-image: none;
        font-size: 1px;
        color: red;
    }
    .pac-item-query {
        color: red;
    }
    .pac-item {
        padding: 20px;
    }
`;

export default GlobalStyle;
