import { BrowserRouter,Routes,Route } from "react-router-dom";
import Navbar from "./components/navbar";
import HomePage from "./pages/homePage";
import CartPage from "./pages/cartPage";
import NotFoundPage from "./pages/notFoundPage"
import AddProduct from "./pages/addproductpage";
import "./App.css"

function App() {
  return (
    <div className="App flex flex-col h-screen">
      <BrowserRouter>
         <Navbar />
         <div className="bg-bgColor basis-full">
            <Routes>
                <Route index path="/" element={<HomePage />} />
                <Route path="/addproduct" element={<AddProduct />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
         </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
