import React from 'react';
import ReactDOM from 'react-dom/client';
import { PersistGate } from 'reduxjs-toolkit-persist/es/integration/react';
import { persistStore } from 'reduxjs-toolkit-persist';
import { Provider } from 'react-redux'
import reportWebVitals from './reportWebVitals';
import store from './app/store';
import LandingPage from './pages/landingPage';
import './index.css';

const LazyApp = React.lazy(()=>import("./App"))
let persistor = persistStore(store);
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <React.Suspense fallback={<LandingPage />}>
             <LazyApp />
          </React.Suspense> 
        </PersistGate>
    </Provider>
    </React.StrictMode>
  );
}


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
