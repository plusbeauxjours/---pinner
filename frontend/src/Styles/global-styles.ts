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
        font-size: 14px;
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
`;

export default GlobalStyle;
