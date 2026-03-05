import { LoginPage } from "./LoginPage";
import { DashboardPage } from "./dashboardPage";


class POManager{

constructor(page){
    /** here there are several importan things like we are using this._object to avoid confunsions 
     * between the name of the object and the getters that we define later, beacuse that if you dont define 
     * that property with the _name you will have a problem because when you call the getter it will try to call
     *  the getter again and that will cause an infinite loop 
     */
    this.page = page
    this._loginPage = new LoginPage(this.page);
    this._dashboardPage = new DashboardPage(this.page);
}

// here we are using setter since it is more easy understand the getter when you are using it into the test 
// you just need to write POManager.loginPage, instead of POManager.loginPage(), and that is because the getter is a property.
// and you are not  defining the children POM as a function.
get loginPage(){
return this._loginPage;
}

get dashboardPage(){
    return this._dashboardPage;
}



}

// here we need to use the export sentence instead of module.export beacuse we are using the import/export syntax 
// instead of the require/module.exports syntax, and that is because we are using ES6 modules instead of CommonJS
//  modules
export { POManager }