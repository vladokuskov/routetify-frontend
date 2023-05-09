'use client';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

  @supports (font: -apple-system-body) and (-webkit-appearance: none) { img[loading="lazy"] { clip-path: inset(0.6px) } }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
    -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
    -moz-box-sizing: border-box;    /* Firefox, other Gecko */
    box-sizing: border-box;         /* Opera/IE 8+ */
    margin: 0;
    padding: 0;

  }

  *:focus:not(:focus-visible) {
    outline: none;
    box-shadow: none;
  }
  *:focus-visible {
    outline: 3px solid #a3d168;
    outline-offset: .2rem;
    box-shadow: none;
    border-radius: 4px;
  }

  * {
    scrollbar-width: thin;
    scrollbar-color: #333333 #1f1f1f;
  }

  /* Chrome, Edge, and Safari */
  *::-webkit-scrollbar {
    width: 16px;
  }

  *::-webkit-scrollbar-track {
    background: #1f1f1f;
  }

  *::-webkit-scrollbar-thumb {
    background-color: #4b4b4b;
    border-radius: 10px;
  }

  body,
  html {
    line-height: 1.5;
    background-color: #f8f6f6;
    margin: 0;
    padding: 0;
    font-size: 16px;
    height: 100%;
    width: 100%;

    *::-moz-selection {
      background: #9e9e9e50;
    }

    *::selection {
      background: #9e9e9e50;
    }
  }

  h1,
  h2,
  h3,
  h4 {
    margin: 0;
    text-decoration: none;
  }

  p, li, ul {
    margin: 0;
  }

  a {
    cursor: pointer;
    margin: 0;
    text-decoration: none;
    transition: 0.2s;
  }

  button {
    transition: 0.2s;
    border: none;
    background-color: transparent;
    cursor: pointer;
    text-decoration: none;
    margin: 0;
    padding: 0;
    -webkit-tap-highlight-color: transparent;
  }

  ul[role="list"],
  ol[role="list"] {
    list-style: none;
  }
  li {
    list-style-type: none;
  }

  html:focus-within {
  scroll-behavior: smooth;
  }

  input,
  button,
  textarea,
  select {
  font: inherit;
  }
`;

export default GlobalStyle;
