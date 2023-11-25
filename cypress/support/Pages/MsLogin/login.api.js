







export default class loginFunction{
    msLogin1() {
        cy.viewport(1280, 720);
        cy.visit('/');
    
        cy.contains('Login').click();
    
        cy.origin('https://login.microsoftonline.com', () => {
          const emailField = '[type="email"]';
          const nextButton = '[id="idSIButton9"]';
          const passwordField = '[type="password"]';
          const submitButton = '[type="submit"]';
    
          // Enter email and click "Next"
          cy.get(emailField).type('email',{log:false});
          cy.get(nextButton).click();
    
          // Enter password
          cy.get(passwordField, { timeout: 10000 }).should('be.visible');
          cy.get(passwordField).type('password',{log:false});
    
          // Click "Next" to submit
          cy.get(nextButton).click();
    
          // Click "Submit" button
          cy.get(submitButton).click();
          cy.wait(1000)
        });
      }
}