import styled from 'styled-components';

const desktopMediaQuery = '@media (min-width: 996px)';

const colorBrown = '#372421';
let colorCrema = '#d8c38a';
if (window.innerWidth <= 996) {
  colorCrema = '#decc9bee';
}

const SubtittleStyle = styled.h3`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2em;
  text-align: center;
  margin-bottom: 1vh;
  padding-top: 3vh;
  font-weight: 200;
  color: #372421;

  ${desktopMediaQuery} {
    font-size: 3em;
  }
`;

const SubtittleCircle = styled.div`
  height: 10px;
  width: 10px;
  margin: 0 15px;
  border-radius: 100%;
  background: ${colorBrown};
`;

const Subtittle = ({ children }) => {
  return (
    <SubtittleStyle>
      <SubtittleCircle />
      {children}
      <SubtittleCircle />
    </SubtittleStyle>
  );
};
export { desktopMediaQuery, colorBrown, colorCrema, Subtittle };
