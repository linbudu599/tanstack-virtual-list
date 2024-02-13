import React from 'react';
import VirtualList from '../../src';

import '../../website/index.css';

const DataSource = Array.from({ length: 1000 }).map((_, i) => i);

describe('Classnames.cy.tsx', () => {
  it('Fixed', () => {
    cy.mount(
      <VirtualList
        className='List'
        prefixClassName='my-virtual-list'
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

    cy.get('.my-virtual-list-container').should('exist');
    cy.get('.my-virtual-list-content').should('exist');
    cy.get('.my-virtual-list-item').should('exist');
  });

  it('Dynamic', () => {
    cy.mount(
      <VirtualList
        className='List'
        prefixClassName='my-virtual-list'
        dynamic
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

    cy.get('.my-virtual-list-container').should('exist');
    cy.get('.my-virtual-list-content').should('exist');
    cy.get('.my-virtual-list-item').should('exist');
  });
});
