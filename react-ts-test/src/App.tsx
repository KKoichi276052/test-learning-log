import "./App.css";
import LoginComponent from "./LoginComponent";
import LoginService from "./services/LoginService";

const loginService = new LoginService();
const setToken = (token: string) => {
	console.log(`received the token ${token}`);
};

function App() {
	return <LoginComponent loginService={loginService} setToken={setToken} />;
}

export default App;
