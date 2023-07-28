import { PATH } from 'global-config';
import React, { lazy, Suspense, useEffect } from 'react';
import {BrowserRouter, Route, Routes, Navigate, useNavigate} from "react-router-dom"

// Импорт страниц, способом ленивой загрузки (для уменьшения конечного bundle.js)
const CategoriesPage = lazy(() => import("pages/ControlPanel/CategoriesPage/CategoriesPage"))
const ProductsPage = lazy(() => import("pages/ControlPanel/ProductsPage/ProductsPage"))
const AuthorizationPage = lazy(() => import("pages/ControlPanel/AuthorizationPage/AuthorizationPage"))
const RegistrationPage = lazy(() => import("pages/ControlPanel/RegistrationPage/RegistrationPage"))
const AboutPage = lazy(() => import("pages/Shop/AboutPage/AboutPage"))
const BasketPage = lazy(() => import("pages/Shop/BasketPage/BasketPage"))
const CategoryListPage = lazy(() => import("pages/Shop/CategoryListPage/CategoryListPage"))
const ContactsPage = lazy(() => import("pages/Shop/ContactsPage/ContactsPage"))
const GuaranteesPage = lazy(() => import("pages/Shop/GuaranteesPage/GuaranteesPage"))
const HomePage = lazy(() => import("pages/Shop/HomePage/HomePage"))
const NotFound404Page = lazy(() => import("pages/Shop/NotFound404Page/NotFound404Page"))
const OrderPage = lazy(() => import("pages/Shop/OrderPage/OrderPage"))
const ProductListPage = lazy(() => import("pages/Shop/ProductListPage/ProductListPage"))
const ProductPage = lazy(() => import("pages/Shop/ProductPage/ProductPage"))

function App() {
  const isAuth = localStorage.getItem("isAuth"); // сохраняем флаг авторизации в хранилище браузера, для того, что не авторизовываться повторно при каждом посещении страницы

  return (
    <Suspense fallback={"Идет загрузка страницы..."}>
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
    </Suspense>
  );
}

export default App;
