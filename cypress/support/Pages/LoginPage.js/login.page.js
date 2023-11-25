import helpers from "../../genericMethods/genericMethods"   //Import Generic Method Class
const page = new helpers()      //aliasing of Generic Methods Class
const userNameField= '#username'
const passwordField='#password'
const submitButton='#submit'
const testLoginTextLocator ='.main-container ul li'
const fetchUserNamePassword =".main-container ul li b" // use index 0 for password and index 1 for password
const successTextLocator ='.post-title'
const logout = '.wp-block-button__link'
const errorMessageLocator ='.show'
export default class Login{
    constructor(){
        this.username = ''
        this.password =''
    }
    navigatToLoginPage(){
        page.navigateToPath('practice-test-login/')
    }
    verifyCorrectPageLoaded(text){
        page.verifyTextPresentIndexing(testLoginTextLocator,text,'0')
    }

    getUserNameFromPage(){
       return cy.get(fetchUserNamePassword).eq(0).invoke('text')
    }
    getPasswordFromPage(){
        return cy.get(fetchUserNamePassword).eq(1).invoke('text')
    }
    fetchDataAndLogin(){
        this.getPasswordFromPage().then((text)=>{
            this.inputPassword(text)
        })
        this.getUserNameFromPage().then((text)=>{
            this.inputUserName(text)
        })
        this.clickSubmit()
    }
    inputUserName(username){
        page.type(userNameField,username)
    }
    inputPassword(password){
        page.type(passwordField,password)
    }
    clickSubmit(){
        page.click(submitButton)
    }
    verifySuccessLogin(successLoginString) {
        cy.get(successTextLocator).invoke('text').then((text) => {
          expect(text).to.equal(successLoginString);
        });
      }
    logout(){
        page.verifyElementVisiblity(logout)
        page.click(logout)
    }
    verifyInvalidCredentialsNotification(errorText){
        page.verifyTextPresent(errorMessageLocator,errorText)
    }
    
      
    


}