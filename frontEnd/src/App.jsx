
import './App.css'
import SideBar from './components/SideBar.jsx';
import Dashboard from './components/pages/Dashboard.jsx';
import Tables from './components/pages/Tables.jsx';
import Orders from '../src/components/pages/Orders.jsx';
import Inventory from './components/pages/Inventory/Inventory.jsx';
import Booking from './components/pages/Booking.jsx';
import Login from './components/pages/login.jsx';
import Setting from './components/pages/Setting.jsx';

import { Routes, Route, Outlet } from "react-router-dom";
import ProtectedRoute from './util/ProtectedRoute.jsx';

const Layout = () => {
    return (
        <div className="w-full min-h-screen flex">
            <SideBar />

            <div className="flex-1">
                <Outlet />
            </div>
        </div>
    );
};

function App() {

    return (
        <Routes>

    
            <Route path="/login" element={<Login />} />

            <Route element={<ProtectedRoute />}>
             <Route element={<Layout />}>

                <Route path="/" element={<Dashboard />} />
                <Route path="/tables" element={<Tables />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/inventory" element={<Inventory />} />
                <Route path="/booking" element={<Booking />} />
                <Route path="/setting" element={<Setting />} />

             </Route>
           </Route> 

        </Routes>
    );
}

export default App;
