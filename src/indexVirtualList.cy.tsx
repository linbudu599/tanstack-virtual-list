import React from 'react'
import VirtualList from './index'

describe('<VirtualList />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<VirtualList />)
  })
})