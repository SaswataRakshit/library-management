import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import App from './App';

test("render app", () => {
  const div = document.createElement("div")
  ReactDOM.render(<button />, div)
});
