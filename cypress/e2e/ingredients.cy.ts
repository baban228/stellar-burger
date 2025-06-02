import Cypress from 'cypress';

const BASE_URL = 'https://norma.nomoreparties.space/api';
const ID_BUN = `[data-cy=${'643d69a5c3f7b9001cfa093c'}]`;
const ID_ANOTHER_BUN = `[data-cy=${'643d69a5c3f7b9001cfa093d'}]`;
const ID_FILLING = `[data-cy=${'643d69a5c3f7b9001cfa0941'}]`;

beforeEach(() => {
  cy.intercept('GET', `${BASE_URL}/ingredients`, {
    fixture: 'ingredients.json'
  });
  cy.visit('/');
  cy.viewport(1440, 800);
  cy.get('#modals').as('modal');
});

describe('добавление ингредиента в список заказа', () => {
  it('инкремент счетчика ингредиента', () => {
    cy.get(ID_FILLING).children('button').click();
    cy.get(ID_FILLING).find('.counter__num').contains('1');
  });

  describe('добавление булок и начинок', () => {
    it('добавление булки и начинки в список заказа', () => {
      cy.get(ID_BUN).children('button').click();
      cy.get(ID_FILLING).children('button').click();
    });

    it('добавление булки после добавления начинок', () => {
      cy.get(ID_FILLING).children('button').click();
      cy.get(ID_BUN).children('button').click();
    });
  });

  describe('замена булок', () => {
    it('замена булки другой булкой при пустом списке начинок', () => {
      cy.get(ID_BUN).children('button').click();
      cy.get(ID_ANOTHER_BUN).children('button').click();
    });

    it('замена булки другой булкой при полном списке начинок ', () => {
      cy.get(ID_BUN).children('button').click();
      cy.get(ID_FILLING).children('button').click();
      cy.get(ID_ANOTHER_BUN).children('button').click();
    });
  });
});
