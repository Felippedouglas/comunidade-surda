import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    --bg: #0f1115;
    --card: #121418;
    --text: #e6eef6;
  }
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    font-family: Inter, Arial, Helvetica, sans-serif;
    background: var(--bg);
    color: var(--text);
  }
  a {
    color: inherit;
  }
`;
