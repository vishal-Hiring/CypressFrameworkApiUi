import Exception from "../../support/Pages/Exception/testExceptions.page";
const ex = new Exception();

describe('Test Suite For Exception Handling',()=>{
    let creds;
    before(()=>{
        cy.fixture('testData.json').then((data) => {
            creds = data;
          });
    })
    beforeEach(()=>{
        ex.ExceptionsPageLoad()
    })
    it('Test case 1: NoSuchElementException handling',()=>{
        const Inputtexts = creds.api;
        ex.addNewRowAndVerifyTwoInput(Inputtexts.newName) //aded proper wait in base class
    })
    it('Test case 2: ElementNotInteractableException handling',()=>{ //used indexing so that only the valid save button will be clicked
        const Inputtexts = creds.api;
        ex.addNewRowAndVerifyTwoInput(Inputtexts.newName) //aded proper wait in base class
        ex.addDataInRow2(Inputtexts.newJob)
        ex.verifySaveSuccess('Row 2 was saved')
    })
    it('Test case 3 : Verify By default input field is disabled',()=>{
        ex.verifyInputDisabledbyDefault()
    })
    // Test case 4: StaleElementReferenceException
    it('Test case 4: StaleElementReferenceException handling',()=>{
        ex.clickAddButton()
        ex.verifySaveSuccess('Row 2 was added')
        ex.verifyAddButtonNotvisible()
    })
    it('Test case 5: TimeoutException handling',()=>{
       ex.clickAddAndVerifyTwoInputRows()
    })
})