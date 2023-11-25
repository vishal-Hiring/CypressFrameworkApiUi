// cypress/services/ApiService.js

class ApiService {
    static listUsersByPage(page) {
      return cy.request({
        method:'GET',
        url:`https://reqres.in/api/users?page=${page}`,
        failOnStatusCode: false,
      })
    }
    static getUserById(userId) {
        return cy.request({
          method:'GET',
          url:`https://reqres.in/api/users/${userId}`,
          failOnStatusCode: false,
        })
      }
      static getUnknownData() {
        return cy.request('https://reqres.in/api/unknown');
      }
      static getUnknownById(unknownId) {
        return cy.request({
          method:'GET',
          url:`https://reqres.in/api/unknown/${unknownId}`,
          failOnStatusCode: false,
        })
      }
      static createUser(user) {
        return cy.request({
          method: 'POST',
          url: 'https://reqres.in/api/users',
          failOnStatusCode: false,
          body: user,
        });
      }
      static updateUser(userId, updatedUserData) {
        return cy.request({
          method: 'PUT',
          url: `https://reqres.in/api/users/${userId}`,
          failOnStatusCode: false,
          body: updatedUserData,
        });
      }
      static patchUser(userId, patchedUserData) {
        return cy.request({
          method: 'PATCH',
          failOnStatusCode: false,
          url: `https://reqres.in/api/users/${userId}`,
          body: patchedUserData,
        });
      }
      static deleteUser(userId) {
        return cy.request({
          method: 'DELETE',
          url: `https://reqres.in/api/users/${userId}`,
          failOnStatusCode: false,
        });
      }
      static registerUser(user) {
        return cy.request({
          method: 'POST',
          url: 'https://reqres.in/api/register',
          failOnStatusCode: false,
          body: user,
        });
      }
    
      static loginUser(user) {
        return cy.request({
          method: 'POST',
          url: 'https://reqres.in/api/login',
          failOnStatusCode: false,
          body: user,
        });
      }
    
      static getUsersWithDelay(delaySeconds) {
        return cy.request(`https://reqres.in/api/users?delay=${delaySeconds}`);
      }
  }
  
  export default ApiService;
  