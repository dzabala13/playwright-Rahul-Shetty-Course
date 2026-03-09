export enum Tags {
  Smoke = '@smoke',
  Visual = '@visual',
  Functional = '@functional',
  Soft = '@soft',
  Api = '@api',
  Ocr = '@ocr',
  Auth = '@auth',
  GeneratedByAI = '@generated-by-ai',
  A11Y = '@a11y',
}

/**
 *  remember that you can run just on specific group of test cases by using the tag that you define in the test case
 * 
 *  the command that you should follow is: npx playwright test --grep Smoke 
 * 
 *  for instance: 
 *  npx playwright test tests/E2EFlowWithPOM.spec.js --grep Functional
 * 
 */
