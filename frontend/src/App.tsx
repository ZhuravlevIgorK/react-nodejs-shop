import CategoriesPage from 'pages/ControlPanel/CategoriesPage/CategoriesPage';
import ProductsPage from 'pages/ControlPanel/ProductsPage/ProductsPage';
import React, { useEffect } from 'react';
import {BrowserRouter, Route, Routes, Navigate, useNavigate} from "react-router-dom"
import AuthorizationPage from './pages/ControlPanel/AuthorizationPage/AuthorizationPage';
import RegistrationPage from './pages/ControlPanel/RegistrationPage/RegistrationPage';
import AboutPage from './pages/Shop/AboutPage/AboutPage';
import BasketPage from './pages/Shop/BasketPage/BasketPage';
import CategoryListPage from './pages/Shop/CategoryListPage/CategoryListPage';
import ContactsPage from './pages/Shop/ContactsPage/ContactsPage';
import GuaranteesPage from './pages/Shop/GuaranteesPage/GuaranteesPage';
import HomePage from './pages/Shop/HomePage/HomePage';
import NotFound404Page from './pages/Shop/NotFound404Page/NotFound404Page';
import OrderPage from './pages/Shop/OrderPage/OrderPage';
import ProductListPage from './pages/Shop/ProductListPage/ProductListPage';
import ProductPage from './pages/Shop/ProductPage/ProductPage';

export const PATH = {
  SHOP: {
    HOME: "/home",
    CATEGORIES: "/list-categories",
    PRODUCTS: "/list-products/:categoryId",
    PRODUCT: "/list-product/:productId",
    GUARANTES: "/guarantes",
    ABOUT: "/about",
    CONTACTS: "/contacts",
    BASKET: "/basket",
    ORDER: "/order",
  },

  CONTROL_PANEL: {
    AUTH: "/control-panel/authorization",
    REGISTRATION: "/control-panel/registration",
    CATEGORIES: "/control-panel/categories",
    PRODUCTS: "/control-panel/products",
  }  
  
}


function App() {
  const isAuth = localStorage.getItem("isAuth");

  return (
      <Routes>
        {/* Админ панель */}
        <Route path={PATH.CONTROL_PANEL.AUTH} element={<AuthorizationPage />} />
        <Route path={PATH.CONTROL_PANEL.REGISTRATION} element={<RegistrationPage />} />
        {isAuth && <Route path={PATH.CONTROL_PANEL.CATEGORIES} element={<CategoriesPage />} />}
        {isAuth && <Route path={PATH.CONTROL_PANEL.PRODUCTS} element={<ProductsPage />} />}
        {/* Админ панель */}

        {/* Магазин */}
        <Route path={PATH.SHOP.HOME} element={<HomePage />} />
        <Route path={PATH.SHOP.CATEGORIES} element={<CategoryListPage />} />
        <Route path={PATH.SHOP.PRODUCTS} element={<ProductListPage />} />
        <Route path={PATH.SHOP.PRODUCT} element={<ProductPage />} />
        <Route path={PATH.SHOP.GUARANTES} element={<GuaranteesPage />} />
        <Route path={PATH.SHOP.ABOUT} element={<AboutPage />} />
        <Route path={PATH.SHOP.CONTACTS} element={<ContactsPage />} />

        <Route path={PATH.SHOP.BASKET} element={<BasketPage />} />
        <Route path={PATH.SHOP.ORDER} element={<OrderPage />} />
        
        <Route path="/" element={<Navigate to={PATH.SHOP.HOME} />} />
        {/* Магазин */}

        <Route path="*" element={<NotFound404Page />} />
      </Routes>
  );
}

export default App;
