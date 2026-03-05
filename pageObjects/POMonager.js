import { LoginPage } from "./LoginPage";
import { DashboardPage } from "./dashboardPage";


class POManager{

constructor(page){

    this.page = page
    this._loginPage = new LoginPage(this.page);
    this._dashboardPage = new DashboardPage(this.page);


}

get loginPage(){
return this._loginPage;
}

get dashboardPage(){
    return this._dashboardPage;
}



}

export { POManager }