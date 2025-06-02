import Cypress from 'cypress';

const BASE_URL = 'https://norma.nomoreparties.space/api';
const ID_FILLING = `[data-cy=${'643d69a5c3f7b9001cfa0941'}]`;

beforeEach(() => {
  cy.intercept('GET', `${BASE_URL}/ingredients`, {
    fixture: 'ingredients.json'
  });
  cy.visit('/');
  cy.viewport(1440, 800);
  cy.get('#modals').as('modal');
});

describe('модельные окна', () => {
  it('открытие и проверка отображения данных модального окна ингредиента', () => {
    cy.get('@modal').should('be.empty');
    cy.get(ID_FILLING).children('a').click();
    cy.get('@modal').should('be.not.empty');
    cy.url().should('include', '643d69a5c3f7b9001cfa0941');
  });

  it('закрытие модального окна ингредиента по клику на ‭«✕»', () => {
    cy.get('@modal').should('be.empty');
    cy.get(ID_FILLING).children('a').click();
    cy.get('@modal').should('be.not.empty');
    cy.get('@modal').find('button').click();
    cy.get('@modal').should('be.empty');
  });

  it('закрытие модального окна ингредиента по клику на ‭оверлей', () => {
    cy.get('@modal').should('be.empty');
    cy.get(ID_FILLING).children('a').click();
    cy.get('@modal').should('be.not.empty');
    cy.get(`[data-cy='overlay']`).click({ force: true });
    cy.get('@modal').should('be.empty');
  });

  it('закрытие модального окна ингредиента по нажатию на «Escape»', () => {
    cy.get('@modal').should('be.empty');
    cy.get(ID_FILLING).children('a').click();
    cy.get('@modal').should('be.not.empty');
    cy.get('body').trigger('keydown', { key: 'Escape' });
    cy.get('@modal').should('be.empty');
  });
});
