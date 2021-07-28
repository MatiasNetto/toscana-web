import React from 'react';
import { storage } from '../components/Firebase';

const TestPage = () => {
  const deleteStorage = (imgsRefs) => {
    imgsRefs.forEach((reference) => {
      storage.ref(reference).delete();
    });
  };

  return (
    <>
      <button onClick={deleteStorage}>Delete</button>
    </>
  );
};

export default TestPage;
