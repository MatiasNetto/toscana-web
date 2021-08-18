import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { db } from '../../components/Firebase';
import AnalyticCard from '../../components/adminPage/AnalyticCard';

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const CardsContainer = styled.div`
  width: 100%;
  height: 40%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 3vw;
`;

const Home = () => {
  const [totalProducts, setTotalProducts] = useState(null);
  const [totalViews, setTotalViews] = useState(null);
  const [todayViews, setTodayViews] = useState(null);

  const getTotalProducts = async () => {
    let total = 0;
    const anillos = await db.collection('anillos').get();
    total += anillos.size;

    const aros = await db.collection('aros').get();
    total += aros.size;

    const pulseras = await db.collection('pulseras').get();
    total += pulseras.size;

    const collares = await db.collection('collares').get();
    total += collares.size;

    const relojes = await db.collection('relojes').get();
    total += relojes.size;

    setTotalProducts(total);
  };

  const getTotalViews = async () => {
    const views = await db.collection('analytics').get();
    setTotalViews(views.size);
  };

  const getTodayViews = async () => {
    const today = new Date();
    const fecha =
      JSON.stringify(today.getDate()) + JSON.stringify(today.getMonth()) + JSON.stringify(today.getFullYear());
    const viewsToday = await db.collection('analytics').where('date', '==', fecha).get();

    setTodayViews(viewsToday.size);
  };

  useEffect(() => {
    getTotalProducts();
    getTotalViews();
    getTodayViews();
  }, []);

  return (
    <Container>
      <CardsContainer>
        <AnalyticCard tittle="Total Productos" amount={totalProducts} iconClassName="fas fa-tags" />
        <AnalyticCard tittle="Visitas Totales" amount={totalViews} iconClassName="fas fa-user-friends" />
        <AnalyticCard tittle="Visitas Hoy" amount={todayViews} iconClassName="fas fa-user-friends" />
      </CardsContainer>
    </Container>
  );
};

export default Home;
