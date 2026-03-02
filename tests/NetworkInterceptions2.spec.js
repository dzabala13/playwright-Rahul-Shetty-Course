import { request, test, expect } from "@playwright/test";
import { ApiUtils } from "./utils/ApiUtils";

const loginPayload = { userEmail: "test123daniel@email.com", userPassword: "123password" }
const orderPayload = { orders: [{ country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68" }] }
let response;

test.beforeAll(async () => {

    const apiContext = await request.newContext();
    const apiUtils = new ApiUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload);

})


test('APi testing', async ({ page }) => {

    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);
    await page.goto('https://rahulshettyacademy.com/client/');

    console.log("this is the order id that will be used: " + response.orderId);

    await page.getByRole("listitem").getByRole("button", { name: "ORDERS" }).click();
    await page.locator('table thead').waitFor();


    // here we are modyfing the request that we are sending to query the order id for the user, we are sending a wrong id, in order to validate that 
    // an specific user only should see the orders that he has done, this is a kind of security testing 


    await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*',

        // aqui usamos una funcion anonima: route es el argumento (lado izquierdo) y al lado derecho va lo que se ejecuta.
        // como solo ejecutamos una linea, no necesitamos usar {} ni await dentro; esa linea ya retorna la promesa y Playwright la espera por lo que
        //  estamos usando la version corta de la funcion anonima, si tuvieramos mas lineas de codigo dentro de la funcion anonima, entonces si 
        // tendriamos que usar {} y await para cada linea que retorne una promesa
        async route => route.continue({ url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f676546588" })
    );


    await page.locator("button.btn:has-text('View')").first().click();


    // aca estamos validando la respuesta que nos da el sistema al tratar de consultar un pedido que no corresponde al usuario logueado,
    //  en este caso el mensaje de error que se muestra en pantalla, esto es una validacion de seguridad para validar que un usuario no 
    // pueda ver los pedidos de otro usuario

    // disclamer : aca no vas a ver que la url consultada en el navegador cambio, nosotros solo estamos interceptando el request a nivel de red 
    // no lo estamos haciendo en la ui del navegador por eso no se ve los cambios reflejados en la url del navegador, pero si se ve reflejado
    //  en la respuesta que nos da el sistema al tratar de consultar un pedido que no corresponde al usuario logueado
    await expect(page.locator('p.blink_me')).toHaveText('You are not authorize to view this order');

})