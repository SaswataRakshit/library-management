import React from 'react'
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from '@testing-library/react'
import Collections from '../Collections'
import CollectionsCard from '../CollectionCard/CollectionCard'

describe("Collections Test", () => {
    const bookArray = [
        {
            id: 1,
            name: "Glitter Up the Dark: How Pop Music Broke the Binary",
            author: "Sasha Geffen",
            desc: "In the twentieth century, the question “Is he musical?” often served as code for “Is he gay?” explains Sasha Geffen in the intro to Glitter Up the Dark, which explores the many ways in which pop music broke the gender binary (while also acknowledging it was never fully intact). From the castrati of mid-sixteenth-century Italy to “Ma” Rainey’s lesbian blues to SoundCloud’s shape-shifting stars, Geffen takes readers on an illuminating journey in lyrical, punkish prose.",
            copy: 1,
            img: "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1589987471-51rmReNlyaL.jpg?crop=1xw:1xh;center,top&resize=768:*",
            type: "bookCollection"
        },
        {
            id: 2,
            name: "My Mother's House",
            author: "Francesca Momplaisir",
            desc: "In Momplaisir’s terrifyingly dark first novel, Lucien leaves Haiti for Queens with his family and settles in a home he calls “My Mother’s House.” As he sinks into depraved evil and tortuous violence against women, the house is watching and waiting. Momplaisir’s brutal exploration of the immigrant experience, gender dynamics, and race is masterful and makes for a stunning debut.",
            copy: 10,
            img: "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1589809811-51LW1hYuseL.jpg?crop=1xw:1xh;center,top&resize=768:*",
            type: "bookCollection"
        },
        {
            id: 3,
            name: "Red Dress in Black and White",
            author: "Elliot Ackerman",
            desc: "A former Marine who served in Iraq and Afghanistan, Ackerman focuses his novels on the effects of international conflict. Red Dress in Black and White spans a single day in Istanbul in which Catherine, an American with a young son, decides to flee her powerful Turkish husband to return to the States with the American photographer she’s fallen in love with. Her husband is unwilling to lose her and calls in powerful favors that cast a light on the shadowy geopolitical forces at work around the world. At once suspenseful and delicate, Red Dress in Black and White deftly depicts love in a brutal time.",
            copy: 8,
            img: "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1589809655-51nFK3-YAL.jpg?crop=1xw:1xh;center,top&resize=768:*",
            type: "bookCollection"
        },
        {
            id: 4,
            name: "The City We Became",
            author: "N. K. Jemisin",
            desc: "Fantasy writer N. K. Jemisin is the only person to have won a Hugo Award (science fiction’s most prestigious prize) three years in a row. In March, the author creates a new world for the first time since 2015. In The City We Became, human avatars of New York’s five boroughs must battle a force of intergalactic evil called the Woman in White to save their city. Like 2018’s Oscar-winning Spider-Man: Into the Spider-Verse, the novel leans into social commentary—the foe presents as a literal white woman whom some mistakenly deem harmless—without slowing the action sequences that drive the plot forward.",
            copy: 1,
            img: "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1583511679-51aTZ37G1rL.jpg?crop=1xw:1xh;center,top&resize=768:*",
            type: "bookCollection"
        }
    ];

    test('renders the card heading', () => {
        render(<CollectionsCard books={bookArray} booksAvailable={true} loading={false} />);

        expect(screen.getByTestId('collectionHeading')).toHaveTextContent('BOOK COLLECTIONS');
    });

    test('fetches and displays all available book', async () => {
        const mockDataName = bookArray.map(n => n.name)
        render(<CollectionsCard books={bookArray} booksAvailable={true} loading={false} />);

        const listItems = await screen.getAllByTestId('bookName')
        expect(listItems).toHaveLength(4);
        expect(listItems[0]).toHaveTextContent(mockDataName[0]);
        expect(listItems[1]).toHaveTextContent(mockDataName[1]);
        expect(listItems[2]).toHaveTextContent(mockDataName[2]);
        expect(listItems[3]).toHaveTextContent(mockDataName[3]);
    });

    test('if image render', async () => {
        render(<CollectionsCard books={bookArray} booksAvailable={true} loading={false} />);

        const imageList = await screen.getAllByTestId('bookImage')
        expect(imageList).toHaveLength(4)
    })

    test('if no book available', async () => {
        render(<CollectionsCard booksAvailable={false} loading={false} />);

        expect(screen.getByRole('heading')).toHaveTextContent("No Book is available to borrow!!!")
    });

    test('if loading bar rendered', () => {
        render(<CollectionsCard loading={true} />)

        expect(screen.getByTestId('loadingBook')).toHaveTextContent("Loading...")
    })
})