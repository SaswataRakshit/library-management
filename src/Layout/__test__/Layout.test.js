import React from 'react'
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom';
import Layout from '../Layout';

describe("Layout Test", () => {
    test('renders the heading and links', () => {
        render(<BrowserRouter><Layout /></BrowserRouter>);

        expect(screen.getByRole('heading')).toHaveTextContent('Library Management');
        expect(screen.getByTestId('collectionLink')).toHaveTextContent('Collections')
        expect(screen.getByTestId('borrowedLink')).toHaveTextContent('Borrowed')
    });
})