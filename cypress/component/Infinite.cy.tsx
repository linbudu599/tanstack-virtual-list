import React from 'react';
import VirtualList from '../../src';
import '../../website/index.css';

const DataSource = Array.from({ length: 1000 }).map((_, i) => i);

describe('Infinite.cy.tsx', () => {
  it('Fixed', () => {
    cy.mount(
      <VirtualList
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
    );

    cy.get('.List').scrollTo(0, 2000);

    cy.get('[data-virtual-item-index=1]').should('not.exist');
    cy.get('[data-virtual-item-index=20]').should('not.exist');
  });
});
