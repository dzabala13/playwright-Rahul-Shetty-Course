import { test as base } from "@playwright/test";

// here we adding a custom fixture for handing the data, osea estamos agregando una fixture a esta parte, pero lo que esta
// dentro de la fixture es un array, y el segundo elemento del array es un objeto con la propiedad option en true, 
// eso es para indicar que esta fixture es una "option fixture", y eso es importante porque las "option fixture" 
// son las que se pueden usar en los test sin necesidad de ser pasadas como argumento,
//  osea que no necesitas hacer algo como test('test case', async ({ page, testDataForOrder }) => { ... }) 
// para usar esta fixture, sino que puedes usarla directamente como test('test case', async ({ page }) => { ... })
//  y dentro del test puedes acceder a la fixture usando testDataForOrder, osea que puedes hacer algo como 
// console.log(testDataForOrder) para ver el contenido de la fixture.
export const customTest = base.extend({

    testDataForOrder: [
        {
            username: "test123daniel@email.com",
            password: "123password",
            productName: "ADIDAS ORIGINAL",
            countryName: "India"
        },
        { option: true }  // Esto indica que es una "option fixture"
    ],

})