import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreateCustomer from './pages/CreateCustomer';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/create-customer" element={<CreateCustomer />} />
            </Routes>
        </BrowserRouter>
    );
}
