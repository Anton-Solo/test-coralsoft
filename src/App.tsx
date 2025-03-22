import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "./app/Home";
import StoreProvider from "./components/StoreProvider";
import UIProvider from "./components/UIProvider";
import SignInPage from "./app/SignIn";

const App = () => {
	return (
		<StoreProvider>
			<BrowserRouter>
				<Routes>
					<Route
						path="/"
						element={
							<PageWrapper>
								<HomePage />
							</PageWrapper>
						}
					/>
					<Route
						path="/sign-in"
						element={
							<PageWrapper>
								<SignInPage />
							</PageWrapper>
						}
					/>
				</Routes>
			</BrowserRouter>
		</StoreProvider>
	);
};

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
	return <UIProvider>{children}</UIProvider>;
};

export default App;
