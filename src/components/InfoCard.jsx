import React from 'react';
import styled from 'styled-components';

import locationIcon from '../assets/Location-Icon.png';
import moneyIcon from '../assets/Money-Icon.png';
import { desktopMediaQuery } from './Styles';

/*################*/
/*#### STYLES ####*/
/*################*/

const CardInfo = styled.div`
  height: 12vh;
  width: 90%;
  display: flex;
  flex-direction: row;
  margin: 1vh auto;

  ${desktopMediaQuery} {
    width: 100%;
  }
`;

const Icon = styled.img`
  height: 80%;
  margin: auto 0;

  ${desktopMediaQuery} {
    height: 90%;
  }
`;

const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 5vw;

  ${desktopMediaQuery} {
    margin-left: 3vw;
  }
`;

const Tittle = styled.h5`
  font-size: 1.2em;

  ${desktopMediaQuery} {
    font-size: 1.6em;
  }
`;

const Description = styled.p`
  font-size: 1em;
  color: #333;

  ${desktopMediaQuery} {
    font-size: 1.4em;
  }
`;

/*###################*/
/*#### COMPONENT ####*/
/*###################*/

const InfoCard = (props) => {
  return (
    <CardInfo>
      <Icon src={props.icon === 'location' ? locationIcon : moneyIcon} />
      <DataContainer>
        <Tittle>{props.tittle}</Tittle>
        <Description>{props.description}</Description>
      </DataContainer>
    </CardInfo>
  );
};

export default InfoCard;
