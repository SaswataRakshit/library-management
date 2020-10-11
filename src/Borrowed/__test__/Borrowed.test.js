import React from 'react'
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from '@testing-library/react'
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import Borrowed from '../Borrowed'
import BorrowedCard from '../BorrowedCard/BorrowedCard'

describe("Borrowed Test", () => {
    const borrowedArray = [
        {
            id: 0,
            name: "Caste: The Origins of Our Discontents",
            author: "Isabel Wilkerson",
            desc: "Almost exactly one decade after releasing The Warmth of Other Suns, her sweeping look at how the Great Migration transformed America, Isabel Wilkerson revolutionizes the way we view race with Caste: The Origins of Our Discontents. Equal parts history, sociology and narrative, Caste makes the argument that American society is a hierarchal culture with resemblance to the caste systems seen in India and Nazi Germany. It proves itself to be as gripping as The Warmth of Other Suns, with Wilkerson once again changing the way we understand America.",
            copy: 3,
            img: "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1597064494-516-Hi5eIhL.jpg?crop=1xw:1xh;center,top&resize=768:*",
            type: "borrowed"
        },
        {
            id: 1,
            name: "Luster: A Novel",
            author: "Raven Leilani",
            desc: "With Luster, Raven Leilani immediately establishes herself as a novelist capable of so perfectly distilling millennial culture, race and class with both wit and compassion. She creates a central character, the twenty-something New Yorker Edie, that’s living a life at once highly relatable (her city apartment woes will have you nodding with sad recognition) and genuinely unorthodox (she moves in with the wife and child of the man she’s having a fling with). Leilani’s remarkable first novel is sharp and funny and transcendent.",
            copy: 4,
            img: "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1594734066-41Rz5EMu1EL.jpg?crop=1xw:1xh;center,top&resize=768:*",
            type: "borrowed"
        }
    ];

    const server = setupServer(
        rest.get('/books.json', (req, res, ctx) => {
            return res(ctx.json({ borrow: boorrowed }));
        })
    );

    beforeAll(() => server.listen());
    afterAll(() => server.close());

    test('renders the card heading', () => {
        render(<BorrowedCard borrowed={borrowedArray} borrowedBook={true} loading={false} />);

        expect(screen.getByTestId('cardHeading')).toHaveTextContent('BORROWED BOOKS');
    });

    test('fetches and displays all borrowed book', async () => {
        const mockDataName = borrowedArray.map(n => n.name)
        render(<BorrowedCard borrowed={borrowedArray} borrowedBook={true} loading={false} />);

        const listItems = await screen.getAllByTestId('bookName')
        expect(listItems).toHaveLength(2);
        expect(listItems[0]).toHaveTextContent(mockDataName[0]);
        expect(listItems[1]).toHaveTextContent(mockDataName[1]);
    });

    test('image rendered', async () => {
        render(<BorrowedCard borrowed={borrowedArray} borrowedBook={true} loading={false} />);

        const listItems = await screen.getAllByTestId('borrowedImg')
        expect(listItems).toHaveLength(2);
    });

    test('if no book borrowed', async () => {
        render(<BorrowedCard borrowedBook={false} loading={false} />);

        expect(screen.getByRole('heading')).toHaveTextContent("You haven't borrowed any book!!!")
    });

    test('if loading bar rendered', () => {
        render(<BorrowedCard loading={true} />)

        expect(screen.getByTestId('loading')).toHaveTextContent("Loading...")
    })
})