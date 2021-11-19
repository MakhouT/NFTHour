import React, {useEffect, useState} from 'react';
import { Button } from '../Button';

import '../../App.css';

export default function Services() {
  const [locked, setLocked] = useState('pending');

  const unlockHandler = e => {
    setLocked(e.detail);
  }

  useEffect(() => {
    window.addEventListener("unlockProtocol", unlockHandler);
    return window.removeEventListener("unlockProtocol", unlockHandler);
  }, []);

  const unlock = () =>{
    window.unlockProtocol && window.unlockProtocol.loadCheckoutModal();
  };

  return (
    <>
      <h1 className='services'>SERVICES
    
      <Button
          className='btns'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
          onClick={unlock}
        >
          Unlock<i className='far fa-play-circle' />
      </Button>
      </h1>
      {locked === 'unlocked' && 'Im unlocked'}
      {locked !== 'unlocked' && <Button onClick={unlock}>Unlock</Button>}

      
    </>
  );
}