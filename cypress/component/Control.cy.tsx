import React, { useRef } from 'react';
import VirtualList, { VirtualListRef } from '../../src';

import '../../website/index.css';

const DataSource = Array.from({ length: 1000 }).map((_, i) => i);

function App() {
  const ref = useRef<VirtualListRef>(null);

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <button
          data-test-id='scrollByOffset'
          onClick={() => {
            ref.current?.scrollByOffset(50, {
              behavior: 'smooth',
            });
          }}
        >
          Scroll by 50px
        </button>
        <button
          data-test-id='scrollToOffset'
          onClick={() => {
            ref.current?.scrollToOffset(500, {
              behavior: 'smooth',
            });
          }}
        >
          Scroll to 500px
        </button>
        <button
          data-test-id='scrollToIndex'
          onClick={() => {
            ref.current?.scrollToIndex(50, {
              align: 'center',
              behavior: 'smooth',
            });
          }}
        >
          Scroll #50 into view
        </button>
      </div>
      <VirtualList
        ref={ref}
        className='List'
        getItemHeight={() => 50}
        dataSource={DataSource}
        getItemKey={(item, index) => item}
        renderItem={(item, index) => {
          return (
            <div className={index % 2 === 0 ? 'ListItemOdd' : 'ListItemEven'}>
              ITEM {item}
            </div>
          );
        }}
      />
    </>
  );
}

describe('Control.cy.tsx', () => {
  it('Fixed', () => {
    cy.mount(<App />);

    cy.get('[data-test-id=scrollByOffset]').click();
    cy.get('[data-virtual-item-index=1]').should('exist');
    cy.get('[data-virtual-item-index=50]').should('not.exist');

    cy.get('[data-test-id=scrollToOffset]').click();
    cy.get('[data-virtual-item-index=1]').should('not.exist');
    cy.get('[data-virtual-item-index=50]').should('not.exist');

    cy.get('[data-test-id=scrollToIndex]').click();
    cy.get('[data-virtual-item-index=1]').should('not.exist');
    cy.get('[data-virtual-item-index=50]').should('exist');
  });
});
