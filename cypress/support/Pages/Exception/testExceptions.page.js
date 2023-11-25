import helpers from "../../genericMethods/genericMethods"   //Import Generic Method Class
const page = new helpers()      //aliasing of Generic Methods Class
const landingPageText ='.main-container h2'
const inputArea ='.input-field'
const editButton ='[name="Edit"]'
const addButton ='[name="Add"]'
const loading ='#loading'
const save ='[name="Save"]'
const SuccessSave='#confirmation'

export default class Exception{
    ExceptionsPageLoad(){
        page.navigateToPath('practice-test-exceptions/')
        
    }
    verifyExceptionPage(text){
        page.verifyTextPresent(landingPageText,text)
    }
    verifyInputDisabledbyDefault(){
        page.shouldBeDisabled(inputArea)
    }
    addNewRowAndVerifyTwoInput(text){
        page.click(editButton)
        page.type(inputArea,text)
        page.click(addButton)
        cy.wait(2000)
        cy.get(inputArea).should('have.length', 2);

    }
    clickAddAndVerifyTwoInputRows(){
        page.click(addButton)
        cy.wait(2000)
        cy.get(inputArea).should('have.length', 2);

    }
   
    addDataInRow2(text){
        page.typeIndex(inputArea,1,text)
        page.clickWithIndex(save,1)
    }
    verifySaveSuccess(text){
        page.verifyTextPresent(SuccessSave,text)
    }
    clickAddButton(){
        page.click(addButton)
    }
    verifyAddButtonNotvisible(){
        page.verifyElementNotVisible(addButton)
    }


}