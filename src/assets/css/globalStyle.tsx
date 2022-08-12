import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

  * {
    font-family: 'Inter', sans-serif;
    font-weight: light 300;
  }

  body {
    width: 100vw;
    min-height: 100vh;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  label {
    margin: 5px 0;
  }

  small {
    color: gray;
  }

  button {
    width: 100%;
    margin-top: 36px;
    border: none;
    box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.4);
  }

  .p_price {
    font-size: 22px;
    font-weight: 500;

    margin-top: 20px;
  }

  .btn_to_hire {
    margin: 0;
  }

  .header_to_hire {
    text-transform: uppercase;
    font-size: 22px;
    font-weight: 500;
    text-align: center;
  }

  .form_style {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    gap: 15px;
  }

  :root {
    --animate-duration: 1.3s;
  }

  .rccs__expiry {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  .rccs__expiry__valid {
    color: rgba(0, 0, 0, 0);
    font-weight: bold;
  }

  .rccs__expiry__valid::after {
    color: white;
    content: 'DATA EXP'
  }

`;

export default GlobalStyle;
