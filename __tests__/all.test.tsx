import * as React from 'react';
import mock from '../support/mock';
import { render, act, fireEvent } from '@testing-library/react';

import fixtureCheckoutCreate from '../fixtures/checkout-create-fixture';
import fixtureShopInfo from '../fixtures/shop-info-fixture';
import fixtureCheckoutLineItemsAdd from '../fixtures/checkout-line-items-add-fixture';
import fixtureCheckoutLineItemsRemove from '../fixtures/checkout-line-items-remove-fixture';
import fixtureCheckoutLineItemsUpdate from '../fixtures/checkout-line-items-update-fixture';

import { Wrapper, App } from '../support/components';

describe('nextjs-commerce-shopify', () => {
  test('should add/remove/update items in shopify', async () => {
    mock(fixtureShopInfo);
    mock(fixtureCheckoutCreate);
    mock(fixtureCheckoutLineItemsAdd);
    mock(fixtureCheckoutLineItemsUpdate);
    mock(fixtureCheckoutLineItemsRemove);

    const { getByText, getByTestId, getAllByText } = render(
      <Wrapper>
        <App />
      </Wrapper>
    );

    await act(async () => {});

    expect(getByText('SGD 10.00'));
    expect(getByTestId('total-items').textContent).toBe('5');

    act(() => {
      fireEvent.click(getByText('Add Item'));
    });

    await act(async () => {});

    expect(getByTestId('total-items').textContent).toBe('15');

    act(() => {
      fireEvent.click(getAllByText('Update Item')[0]);
    });

    await act(async () => {});

    expect(getByTestId('total-items').textContent).toBe('2');

    act(() => {
      fireEvent.click(getAllByText('Remove Item')[0]);
    });

    await act(async () => {});

    expect(getByTestId('total-items').textContent).toBe('0');
  });
});
