

import ApiService from "../../support/Pages/ApiServices/ApiServices";

describe('API Tests for ReqRes.in', () => {
    let creds =null
    before(()=>{
        cy.fixture('testData.json').then((data) => {
            creds = data;
          });
    })
  it.only('1.GET Request: List Users on Page 2', () => {
    const api = creds.api;
    const page = api.pageID;

    ApiService.listUsersByPage(page).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.not.be.null
      expect(response.body.data)
      expect(response.body.page).to.eq(page);
    });
  });

  // application/type
  it('2.GET Request: Get User by ID', () => {
    const api = creds.api;
    const userId = api.pageID;
    ApiService.getUserById(userId).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data.id).to.eq(userId);
    });
  });
  it('3.GET Request: Get User by ID which is not present in backend ', () => {
    const api = creds.api;
    const userId = api.invalidID;
    ApiService.getUserById(userId).then((response) => {
      expect(response.status).to.eq(404);
      if(response.status===404)
      cy.log('User not found. Considered as a passing scenario.');
    });
  });

  it('4.GET Request: Get Unknown Data(List<Resource>)', () => {
    ApiService.getUnknownData().then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data).to.have.length.greaterThan(0);
    });
  });

  it('5.GET Request: Get Unknown(Single<Resource>) by ID', () => {
    const api = creds.api;
    const unknownId =api.unknownValidID;

    ApiService.getUnknownById(unknownId).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data.id).to.eq(unknownId);
    });
  });
  it('6.GET Request: Get Unknown(Single<Resource> NOT FOUND) by ID', () => {
    const api = creds.api;
    const unknownId =api.unknownInValidID;

    ApiService.getUnknownById(unknownId).then((response) => {
      expect(response.status).to.eq(404);
      expect(response.body.data).to.eq(undefined);
    });
  });

  it('7.POST Request: Create User', () => {
    const api = creds.api;
    const newUser = {
      name: api.name,
      job: api.job,
    };

    ApiService.createUser(newUser).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.name).to.eq(newUser.name);
      expect(response.body.job).to.eq(newUser.job);
      let createdUserId = response.body.id;

      // Store the user ID in the local storage
      window.localStorage.setItem('createdUserId', createdUserId);
    });
  });

  it('8.PUT Request: Update User', () => {
    const api = creds.api;
    const userId = localStorage.getItem('createdUserId')
    const updatedUserData = {
      name: api.newName,
      job: api.newJob,
    };

    ApiService.updateUser(userId, updatedUserData).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.name).to.eq(updatedUserData.name);
      expect(response.body.job).to.eq(updatedUserData.job);
    });
  });

  it('9.PATCH Request: Patch User', () => {
    const userId = localStorage.getItem('createdUserId')
    cy.log(userId)
    const api = creds.api;
    const patchedUserData = {
      job: api.updatedJob,
    };

    ApiService.patchUser(userId, patchedUserData).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.job).to.eq(patchedUserData.job);
      expect(response.body).to.have.property('updatedAt');
    });
  });

  it('10.DELETE Request: Delete User', () => {
    const userIdToDelete = Cypress._.get(Cypress.env('localStorage'), 'createdUserId', '');

    ApiService.deleteUser(userIdToDelete).then((response) => {
      expect(response.status).to.eq(204);
    });
  });

  it('11.POST Request: Register User Successful', () => {
    
    const api = creds.api;
    const newUser = {
      email: api.email,
      password: api.password,
    };

    ApiService.registerUser(newUser).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("id");
      expect(response.body).to.have.property("token");
    });
  });
  it('12.POST Request: Register User Unsuccessful', () => {
    const api = creds.api;
    const newUser = {
      email: api.email,
    };

    ApiService.registerUser(newUser).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property("error");
    });
  });

  it('13.POST Request: Login User Success', () => {
    const api = creds.api;
    const userToLogin = {
      email: api.email,
      password: api.password,
    };

    ApiService.loginUser(userToLogin).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
  it('14.POST Request: Login User Rejected ', () => {
    const api = creds.api;
    const userToLogin = {
      email: api.email,
    };

    ApiService.loginUser(userToLogin).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property("error");

    });
  });

  it('15.GET Request: Get Users with Delay', () => {
    const delaySeconds = 3;

    ApiService.getUsersWithDelay(delaySeconds).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});
