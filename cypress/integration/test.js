// describe('My First Test', function () {
//     it('Does not do much!', function () {
//         expect(true).to.equal(true)
//     })
// });
// describe('My First Test', function () {
//     it('Visits the Kitchen Sink', function () {
//         cy.visit('https://example.cypress.io');
//         cy.contains('type').click();
//         // Should be on a new URL which includes '/commands/actions'
//         cy.url().should('include', '/commands/actions')
//         // Get an input, type into it and verify that the value has been updated
//         cy.get('.action-email')
//             .type('fake@email.com')
//             .should('have.value', 'fake@email.com')
//     })
// });

// describe('Foods tests', function () {
//     it('Visits the food page and login', function () {
//         cy.visit("http://localhost:4201/#/new");
//         cy.get("#top-menu-profile").click();
//         cy.get("#profile-panel-login-google").click();
//         // cy.type("gabrielcsollei@gmail.com");
//         // cy.type("{enter}");
//     })
// });

describe('Foods tests', function () {
    it('Visits the food page and login', function () {
        cy.visit("http://localhost:4201/#/new");
        cy.get("#top-menu-restaurants").click();

        cy.wait(1000);

        // cy.get('.all-restaurants .arrows.alternate.icon').first().trigger('dragstart');
        // cy.get('.selected-restaurants').trigger("drop");
        // cy.get('.all-restaurants .arrows.alternate.icon').first().trigger("dragend");
    })
});

