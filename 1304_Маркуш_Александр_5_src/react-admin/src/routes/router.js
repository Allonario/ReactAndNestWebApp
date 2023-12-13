import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { BrokersComponent } from "../components/brokers.component.js";
import {StocksComponent} from "../components/stocks.component.js";
import {TradingComponent} from "../components/trading.component.js";
import './navbar.css'

function Router() {
    return (
        <BrowserRouter>
            <NavBar />
            <Routes>
                <Route path="/brokers" element={<BrokersComponent />} />
                <Route path="/stocks" element={<StocksComponent />} />
                <Route path="/trading" element={<TradingComponent />} />
                <Route path="*" element={<div><h3>Страница не найдена!</h3></div>} />
            </Routes>
        </BrowserRouter>
    );
}

function NavBar() {
    return (
        <div className="navigation_bar">
            <Link to="/brokers" className="navigation_elem">Брокеры</Link>
            <Link to="/stocks" className="navigation_elem">Акции</Link>
            <Link to="/trading" className="navigation_elem">Трейдинг</Link>
        </div>
    );
}

export default Router;