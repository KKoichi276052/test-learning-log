import { expect, test, describe } from "bun:test";
// import LoginComponent from "./LoginComponent";

describe("Login Component", () => {
	// const loginServiceMock = { login: mock() };
	// const setTokenMock = mock();
	// test("should render the login component", () => {
	// 	document.body.innerHTML = (
	// 		<LoginComponent loginService={loginServiceMock} setToken={setTokenMock} />
	// 	);
	// });
	test("dom test", () => {
		document.body.innerHTML = `<button>My button</button>`;
		const button = document.querySelector("button");
		expect(button?.innerText).toEqual("My button");
	});
});
