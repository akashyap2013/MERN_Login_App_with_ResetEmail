import { render, screen } from '@testing-library/react';
import ImageUpload from './ImageUpload';

test('renders learn react link', () => {
  render(<ImageUpload />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});