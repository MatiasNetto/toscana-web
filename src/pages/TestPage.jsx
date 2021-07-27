import React from 'react';
import HomePageSlider from '../components/HomePageSlider';
import TestComponent from '../components/TestComponent';

const TestPage = () => {
  const handleCheckboxChange = (e) => {
    console.log(e.target.checked);
    console.log(e.target.name);
  };
  return (
    <>
      {/* <HomePageSlider /> */}
      {/* <div
        style={{ height: '60px', width: '60px', border: '1px solid #f00' }}
        onClick={(e) => {
          e.target.value = !e.target.value;
          console.log(e.target.value);
        }}
      ></div> */}

      <input
        style={{ height: '3em', width: '3em' }}
        defaultChecked={true}
        name="trending"
        type="checkbox"
        onChange={handleCheckboxChange}
      />
    </>
  );
};

export default TestPage;
