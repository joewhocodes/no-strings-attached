import { render, screen } from '@testing-library/react';
import Header from '../Header';

it('should find text', async () => {
    render(<Header/>);
    expect.returnString().toBe('Hello World');
})