import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./utils/auth";
import Home from "./pages/Home";
import HomeNav from "./components/HomeNav";
import Footer from "./components/Footer";
import ContactPage from "./pages/ContactPage";
import About from "./pages/About";
import ErrorPage from "./pages/ErrorPage";
import CalculatorCard from "./pages/Calculators";
import StockPrices from "./components/stockData";
import SmallcaseList from "./pages/SmallcasesWindmill";

// import WebBuilder from "./WebBuilder";

// function App(){
//   return (
//     <WebBuilder/>
//   )
// }

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <div className="font-sans bg-custom-blue">
                         
                                <HomeNav />
                                <Home />
                                <Footer />
                            </div>
                        }
                    />
                    <Route path="/about" element={<About />} />
                    <Route path="*" element={<ErrorPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/calculator" element={<CalculatorCard/>}/>
                    <Route path="/smallcaselist" element={<SmallcaseList/>}/>
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
