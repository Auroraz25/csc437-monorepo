import { css } from "lit";

const styles = css`
  * {
    margin: 0;
    box-sizing: border-box;
  }
  
  img {
    max-width: 100%;
  }
  
  ul,
  menu {
    display: flex;
    flex-direction: column;
    list-style: none;
    padding: 0;
  }
  
  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    font-weight: normal;
  }
  
  p {
    margin: 0;
  }
  
  a {
    text-decoration: none;
  }
`;

export default { styles };