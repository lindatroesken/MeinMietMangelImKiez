import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`

  * {
    box-sizing: border-box;
  }

  html, body {
    margin: 0;
    font-family: "Gill Sans", sans-serif;
  }

  :root {
    --background-dark: #303841;
    --background-light: #3a4750;
    --accent: #E3001B;
    --contrast: #005A71;
    --neutral-dark: #bebebe;
    --neutral-light: #ffffff;
    --error: var(--accent);

    --size-xs: 4px;
    --size-s: 8px;
    --size-m: 12px;
    --size-l: 16px;
    --size-xl: 24px;
    --size-xxl: 32px;
    
    --max-content-width: 500px;

  }
`
