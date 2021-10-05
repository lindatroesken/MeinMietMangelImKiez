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
    --dark-shades: #5D595D;
    --light-shades: #F8F8F7;
    --accent: #A0ADAF;
    --dark-accent: #8E8C8C;
    --light-accent: #8B9181;
    --error: #f44336;
    --message: #e39e35;

    --size-xxxs: 1px;
    --size-xxs: 2px;
    --size-xs: 4px;
    --size-s: 8px;
    --size-m: 12px;
    --size-l: 16px;
    --size-xl: 24px;
    --size-xxl: 32px;

    --max-content-width: 500px;

  }
`
