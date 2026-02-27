
class ApiUtils{

    // this is the constructor of your class, the things that you want to initialize when you create an instance of your class,
    // in this case we want to initialize the apiContext and the loginPayload, because we will use them in other functions of the class,
    //  and we want to avoid passing them as parameters in every function
    constructor (apiContext, loginPayload) {

        this.apiContext = apiContext;
        this.loginPayload = loginPayload
    }

    async getToken(){

    const loginResponse= await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
                 {data: this.loginPayload});
    
    // using {key} you can destructuring the json object, the variable name is the same as the key in the json object, and the value is the value of that key in the json object
    const {token} = await loginResponse.json();
    console.log('authentication token: ' + token);   

    return token;

    }

    async createOrder (orderPayload){

        let response = {};
        // in this part remember that you need to use 'await' always that you are calling an async function
        response.token = await this.getToken();

            const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
                {data : orderPayload,
                headers : {
                            'Authorization': response.token,
                            'Content-Type':'application/json'}
                }); 

            response.orderId = (await orderResponse.json()).orders[0];
            console.log("The order Id created:" +response.orderId);
            return response;

    }



}

// in this way you can export the class to be used in other files, without this the class will not be visible in other files
module.exports = {ApiUtils};