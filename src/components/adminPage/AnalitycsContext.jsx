import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from '../../auth/AuthContext';
import { db } from '../Firebase';

const AnalyticsContext = createContext();

const useAnalytics = () => {
  return useContext(AnalyticsContext);
};

const today = new Date();
let data = {
  id: JSON.stringify(Date.now()),
  date: JSON.stringify(today.getDate()) + JSON.stringify(today.getMonth()) + JSON.stringify(today.getFullYear()),
  time: today.getHours() + ':' + today.getMinutes(),
  device: window.innerWidth <= 992 ? 'mobile' : 'desktop',
  platform: navigator.platform,
  categories: [],
  products: [],
};

let categoriesVisited = [];
let productsVisited = [];
const forceAnalytics = false;

/*************/
/* Component */
/*************/

const AnalyticsProvider = ({ children }) => {
  const { currentUser } = useAuth();
  useEffect(() => {
    const uploadData = async () => {
      await db.collection('analytics').doc(data.id).set(data);
    };
    //previene de agregar analiticas cuando estoy desarrollando
    if (!window.location.href.includes('localhost:300') || forceAnalytics) {
      if (!currentUser) uploadData();
    }
  }, []);

  const addCategory = async (category) => {
    //previene de agregar analiticas cuando estoy desarrollando
    if (!window.location.href.includes('localhost:300') || forceAnalytics) {
      if (!currentUser) {
        categoriesVisited = [...categoriesVisited, category];
        await db.collection('analytics').doc(data.id).update({ categories: categoriesVisited });
      }
    }
  };

  const addProduct = async (category, product) => {
    //previene de agregar analiticas cuando estoy desarrollando
    if (!window.location.href.includes('localhost:300') || forceAnalytics) {
      if (!currentUser) {
        productsVisited = [...productsVisited, `${category}/${product}`];
        await db.collection('analytics').doc(data.id).update({ products: productsVisited });
      }
    }
  };

  const value = {
    addCategory,
    addProduct,
  };

  return <AnalyticsContext.Provider value={value}>{children}</AnalyticsContext.Provider>;
};

export { AnalyticsProvider, useAnalytics };
