/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import Root from '../Root';

test('renders correctly', async () => {
	await ReactTestRenderer.act(() => {
		ReactTestRenderer.create(<Root />);
	});
});
