/**
 * @format
 */

import React from 'react';
import { render, cleanupAsync } from '@testing-library/react-native';
import Root from '../Root';

test('renders correctly', async () => {
	render(<Root />);

	await cleanupAsync();
});
