import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import BasketProvider from './context/BasketProvider';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// BrowserRouter из `react-router-dom` добавим провайдер для возможности использовать возможность навигации (считывание параметров, перенаплаение)
// BasketProvider наш написанный провайдер корзины, на основе React Сontext API, который позволяет передаваить глобальные переменные между компонентами использая наш хук useBasketContext()
root.render(
    <BrowserRouter>
      <BasketProvider>
        <App />
      </BasketProvider>
    </BrowserRouter>

);

reportWebVitals();
