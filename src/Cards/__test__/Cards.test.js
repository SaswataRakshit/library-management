import React from 'react'
import "@testing-library/jest-dom/extend-expect"
import { render, screen, fireEvent } from '@testing-library/react'
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import Cards from '../Cards'

describe("Cards Test", () => {
    const borrowed = [
        {
            id: 0,
            name: "Caste: The Origins of Our Discontents",
            author: "Isabel Wilkerson",
            type: "borrowed",
            img: "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1597064494-516-Hi5eIhL.jpg?crop=1xw:1xh;center,top&resize=768:*"
        },
        {
            id: 1,
            name: "Luster: A Novel",
            author: "Raven Leilani",
            type: "borrowed",
            img: "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1594734066-41Rz5EMu1EL.jpg?crop=1xw:1xh;center,top&resize=768:*"
        }
    ];

    const collections = [
        {
            id: 0,
            name: "Caste: The Origins of Our Discontents",
            author: "Isabel Wilkerson",
            desc: "Almost exactly one decade after releasing The Warmth of Other Suns, her sweeping look at how the Great Migration transformed America, Isabel Wilkerson revolutionizes the way we view race with Caste: The Origins of Our Discontents. Equal parts history, sociology and narrative, Caste makes the argument that American society is a hierarchal culture with resemblance to the caste systems seen in India and Nazi Germany. It proves itself to be as gripping as The Warmth of Other Suns, with Wilkerson once again changing the way we understand America.",
            copy: 3,
            img: "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1597064494-516-Hi5eIhL.jpg?crop=1xw:1xh;center,top&resize=768:*",
            type: "bookCollection"
        },
        {
            id: 1,
            name: "Luster: A Novel",
            author: "Raven Leilani",
            desc: "With Luster, Raven Leilani immediately establishes herself as a novelist capable of so perfectly distilling millennial culture, race and class with both wit and compassion. She creates a central character, the twenty-something New Yorker Edie, that’s living a life at once highly relatable (her city apartment woes will have you nodding with sad recognition) and genuinely unorthodox (she moves in with the wife and child of the man she’s having a fling with). Leilani’s remarkable first novel is sharp and funny and transcendent.",
            copy: 4,
            img: "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1594734066-41Rz5EMu1EL.jpg?crop=1xw:1xh;center,top&resize=768:*",
            type: "bookCollection"
        },
        {
            id: 2,
            name: "Wandering in Strange Lands: A Daughter of the Great Migration Reclaims Her Roots",
            author: "Morgan Jerkins",
            desc: "Morgan Jerkins, who was raised in New Jersey, traces the roots of her family tree and the way in which the Great Migration shaped the black experience in Wandering in Strange Lands. Traveling throughout the country, she explores the path her family took as well as her cultural identity as a black woman. Her desire to understand both her personal and cultural origins will inspire you to do the same.",
            copy: 1,
            img: "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1589808615-41wIyv8bmeL.jpg?crop=1xw:1xh;center,top&resize=768:*",
            type: "bookCollection"
        },
        {
            id: 3,
            name: "The Undocumented Americans",
            author: "Karla Cornejo Villavicencio",
            desc: "Part memoir, part reckoning, Cornejo Villavicencio exposes the reality of life as an undocumented immigrant in six astounding essays. As she travels across the U.S., surveying and chronicling the experiences of immigrants living in New York, Miami, Cleveland, New Haven, and Flint, Cornejo Villavicencio introduces us to the people who perform some of America’s most essential services while unequivocally destroying the right-wing talking points that villainize the undocumented. For all who consider themselves Americans, The Undocumented Americans is an urgent must-read.",
            copy: 5,
            img: "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1589808712-416aHbbXuBL.jpg?crop=1xw:1xh;center,top&resize=768:*",
            type: "bookCollection"
        }
    ];

    const server = setupServer(
        rest.get('/borrowed.json', (req, res, ctx) => {
            return res(ctx.json({ borrow: boorrowed }));
        })
    );

    beforeAll(() => server.listen());
    afterAll(() => server.close());

    test('fetches and displays all available books', async () => {
        const name = collections.map(n => n.name)
        const author = collections.map(n => n.author)
        const desc = collections.map(n => n.desc)

        render(collections.map((data, index) => <Cards key={index} display={data.type} name={data.name} author={data.author} desc={data.desc} />));

        const bookName = await screen.getAllByTestId('availableBookName')
        expect(bookName).toHaveLength(4);
        expect(bookName[0]).toHaveTextContent(name[0]);
        expect(bookName[1]).toHaveTextContent(name[1]);
        expect(bookName[2]).toHaveTextContent(name[2]);
        expect(bookName[3]).toHaveTextContent(name[3]);

        const bookAuthor = await screen.getAllByTestId('availableBookAuthor')
        expect(bookAuthor).toHaveLength(4);
        expect(bookAuthor[0]).toHaveTextContent(author[0]);
        expect(bookAuthor[1]).toHaveTextContent(author[1]);
        expect(bookAuthor[2]).toHaveTextContent(author[2]);
        expect(bookAuthor[3]).toHaveTextContent(author[3]);

        const bookDesc = await screen.getAllByTestId('availableBookDesc')
        expect(bookDesc).toHaveLength(4);
        expect(bookDesc[0]).toHaveTextContent(desc[0]);
        expect(bookDesc[1]).toHaveTextContent(desc[1]);
        expect(bookDesc[2]).toHaveTextContent(desc[2]);
        expect(bookDesc[3]).toHaveTextContent(desc[3]);
    });

    test('fetches and displays all borrowed books', async () => {
        const name = borrowed.map(n => n.name)
        const author = borrowed.map(n => n.author)

        render(borrowed.map((data, index) => <Cards key={index} display={data.type} name={data.name} author={data.author} />));

        const bookName = await screen.getAllByTestId('borrowedBookName')

        expect(bookName).toHaveLength(2);
        expect(bookName[0]).toHaveTextContent(name[0]);
        expect(bookName[1]).toHaveTextContent(name[1]);

        const bookAuthor = await screen.getAllByTestId('borrowedBookAuthorName')
        expect(bookAuthor).toHaveLength(2);
        expect(bookAuthor[0]).toHaveTextContent(author[0]);
        expect(bookAuthor[1]).toHaveTextContent(author[1]);
    });

    // test('decrease copy available', async () => {
    //     const onClick = jest.fn();
    //     const name = collections.map(n => n.name)
    //     const author = collections.map(n => n.author)
    //     const copy = collections.map(c => c.copy)

    //     render(collections.map((data, index) => <Cards key={index} display={data.type} name={data.name} author={data.author} copy={data.copy} click={false} />));

    //     const addIcon = screen.getAllByTestId('addButton')

    //     const copyAvailable = screen.getAllByTestId('copyAvailable')

    //     fireEvent.click(addIcon[0])
    //     expect(copyAvailable[0].innerHTML).toBe('Copy Available: ' + (copy[0] - 1))

    // });
})