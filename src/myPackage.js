// @ts-check
// 저렇게 ts-check 해주고 tsconfig.json에 allowJs : true 설정해주고 코멘트만 달아주면 자바스크립트 코드를 타입스크립트처럼 타입 체스를 해줌 

/**
 * Initializes the project
 * @param {object} config
 * @param {boolean} config.debug
 * @param {string} config.url 
 * @returns boolean
 */
// 코멘트로 적을 수 있음. JSDog 코멘트를 더해주면 타입스크립트처럼 사용할 수 있음. 실제 브라우저에는 문제 없이 사용 됨
export function init(config) {
  return true;
}

/**
 * Exits the program
 * @param {number} code 
 * @returns number
 */

export function exit(code) {
  return code + 1;
}

