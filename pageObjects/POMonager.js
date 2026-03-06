import { LoginPage } from "./LoginPage";
import { DashboardPage } from "./dashboardPage";
import { MyCartPage } from "./MyCartPage";
import { OrderPage } from "./OrderPage";
import { OrderConfirmationPage } from "./OrderConfirmationPage";
import { OrderHistoryPage } from "./OrderHistoryPage";

class POManager {

    constructor(page) {
        /** here there are several importan things like we are using this._object to avoid confunsions 
         * between the name of the object and the getters that we define later, beacuse that if you dont define 
         * that property with the _name you will have a problem because when you call the getter it will try to call
         *  the getter again and that will cause an infinite loop 
         */
        this.page = page
        this._loginPage = new LoginPage(this.page);
        this._dashboardPage = new DashboardPage(this.page);
        this._myCartPage = new MyCartPage(this.page);
        this._orderPage = new OrderPage(this.page);
        this._orderConfirmationPage = new OrderConfirmationPage(this.page);
        this._orderHistoryPage = new OrderHistoryPage(this.page);
    }

    // here we are using setter since it is more easy understand the getter when you are using it into the test 
    // you just need to write POManager.loginPage, instead of POManager.loginPage(), and that is because the getter is a property.
    // and you are not  defining the children POM as a function.
    get loginPage() {
        return this._loginPage;
    }

    get dashboardPage() {
        return this._dashboardPage;
    }

    get myCartPage() {
        return this._myCartPage;
    }

    get orderPage() {

        return this._orderPage;
    }

    get orderConfirmationPage(){

        return this._orderConfirmationPage;
    }
    get orderHistoryPage(){

        return this._orderHistoryPage;
    }




}

// here we need to use the export sentence instead of module.export beacuse we are using the import/export syntax 
// instead of the require/module.exports syntax, and that is because we are using ES6 modules instead of CommonJS
//  modules
export { POManager }