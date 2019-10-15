import React from 'react';
import StarRating from './StarRating';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

it('renders 5 stars by default', () => {
	const star = getAllByTestId('star');
	const { getAllByTestId } = render(<StarRating>);
	expect(star).toHaveLength(5);
});

it('renders a specified number of stars', () => {
  const { getAllByTestId } = render(<StarRating starCount={10}/>);
  const star = getAllByTestId('star');
  expect(star).toHaveLength(10);
});
it('renders empty stars with color #bbb by default', () => {
  const { getAllByTestId } = render(<StarRating/>);
  const star = getAllByTestId('star');
  expect(star[0].childNodes[0]).toHaveAttribute('color', '#bbb');

});

it('renders empty stars with the color of the emptyColor value', () => {
  const { getAllByTestId } = render(<StarRating emptyColor="#0000"/>);
  const star = getAllByTestId('star');
  expect(star[0].childNodes[0]).toHaveAttribute('color', '#0000');

});

it('renders filled stars as yellow by default', () => {
  const { getAllByTestId } = render(<StarRating value={2}/>);
  const star = getAllByTestId('star');
  expect(star[0].childNodes[0]).toHaveAttribute('color', 'yellow');

});

it('renders filled stars with the color of the filledColor value', () => {
  const { getAllByTestId } = render(<StarRating value={2} filledColor="blue"/>);
  const star = getAllByTestId('star');
  expect(star[0].childNodes[0]).toHaveAttribute('color', 'blue');

});

it('renders a star using the 1x size by default', () => {
  const { getAllByTestId } = render(<StarRating/>);
  const star = getAllByTestId('star');
  expect(star[0].childNodes[0]).toHaveClass('fa-1x');
});

it('renders a star using the size value', () => {
  const { getAllByTestId } = render(<StarRating size="1x"/>);
  const star = getAllByTestId('star');
  expect(star[0].childNodes[0]).toHaveClass('fa-1x');

});

it('renders 0 filled stars when value is 0', () => {
  const { container } = render(<StarRating value={0}/>);
  const filledStars = container.querySelectorAll('.fa-star[color="yellow"]');
  expect(filledStars).toHaveLength(0)
});

it('renders filled stars equal to value when value is greater than 0', () => {
  const { container } = render(<StarRating value={2}/>);
  const filledStars = container.querySelectorAll('.fa-star[color="yellow"]');
  expect(filledStars).toHaveLength(2);

});

it('updates when clicking on an empty star', () => {
  const onClick= jest.fn();
  const { getAllByTestId } = render(<StarRating onClick={onClick}/>);
  const star = getAllByTestId('star');
  fireEvent.click(star[1]);
  expect(onClick).toHaveBeenCalledWith(2);
});


it('sets the value to 0 when clicking on a filled star', () => {
  const onClick = jest.fn();
  const { getAllByTestId } = render(<StarRating value={2} onClick={onClick}/>);
  const stars = getAllByTestId('star');
  fireEvent.click(stars[1]);
	expect(onClick).toHaveBeenCalledWith(0);
});

