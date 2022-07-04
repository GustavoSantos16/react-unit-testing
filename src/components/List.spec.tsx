import {render, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import List from './List';

describe('App component', () => {
    it('should render list items', async () => {
        const {getByText, rerender, queryByText} = render(<List initialItems={['Diego', 'Rodz', 'Mayk']}/>)

        expect(getByText('Diego')).toBeInTheDocument()
        expect(getByText('Rodz')).toBeInTheDocument()
        expect(getByText('Mayk')).toBeInTheDocument()

        // await rerender(<List initialItems={['Julia']}/>)

        // expect(getByText('Julia')).toBeInTheDocument()
        // expect(queryByText('Mayk')).not.toBeInTheDocument()


    });
    
    it('should be able to add new item to the list', async () => {
        const {getByText, getByPlaceholderText, findByText} = render(<List initialItems={[]}/>)

        const inputElement = getByPlaceholderText('Novo Item');
        const addButton = getByText('Adicionar');

        await userEvent.type(inputElement, 'Novo');
        await userEvent.click(addButton);

        expect(await findByText('Novo')).toBeInTheDocument()
    });

    it('should be able to remove item to the list', async () => {
        const {getByText, getAllByText, queryByText} = render(<List initialItems={['Diego']}/>)

        const removeButtons = getAllByText('Remover');

        await userEvent.click(removeButtons[0]);

        await waitFor(() => {
            expect(queryByText('Diego')).not.toBeInTheDocument()
        })


    });
})