import styled from 'styled-components';

const desktopMediaQuery = '@media (min-width: 996px)';

const Subtittle = styled.h3`
  font-size: 2em;
  text-align: center;
  margin-bottom: 1vh;
  padding-top: 3vh;

  ${desktopMediaQuery} {
    font-size: 3em;
  }
`;

export { desktopMediaQuery, Subtittle };
