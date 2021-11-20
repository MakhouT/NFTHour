// Get started by creating a new React
// component and importing the libraries!

import React from "react";
import Unity, { UnityContent } from "react-unity-webgl";
import * as Web3 from 'web3';
import { OpenSeaPort, Network } from 'opensea-js';
import Web3Modal from "web3modal";

export default class Services extends React.Component {
  constructor(props) {
    super(props);
    this.unityContent = new UnityContent(
      '/Build/Build/jojo.json', 
      '/Build/Build/UnityLoader.js'
    );
  }

 

  previous() {
    this.unityContent.send("GameManager", "Previous");
  }

  next() {
    this.unityContent.send("GameManager", "Next");
  }

  async getKitties() {
    // This example provider won't let you make transactions, only read-only calls:
    const provider = new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/5bfc700d083f432bade6e389c661fc8f');

    const seaport = new OpenSeaPort(provider, {
      networkName: Network.Rinkeby
    });

    console.log(seaport);

    const asset = {
      tokenAddress: "0x16baf0de678e52367adc69fd067e5edd1d33e3bf", // CryptoKitties
      tokenId: "5770", // Token ID
    }

    const providerOptions = {
      /* See Provider Options Section */
    };

    const web3Modal = new Web3Modal({
      providerOptions // required
    });
    
    const providerWeb3 = await web3Modal.connect();
    
    const web3 = new Web3(providerWeb3);

    const address = web3.currentProvider.selectedAddress;

    const balance = await seaport.getAssetBalance({
      address: address,
      asset: asset,
    });

    console.log('BALANCE', balance);

    const ownsKitty = balance.greaterThan(0)
    
  }

  render() {
    return (
      <div>
        <button onClick={this.previous.bind(this)}>PREVIOUS</button>
        <button onClick={this.next.bind(this)}>NEXT</button>
        <button onClick={this.getKitties.bind(this)}>Get Kitties</button>
        <Unity unityContent={this.unityContent} />
      </div>
    );
  }
}


// import React, {useEffect, useState} from 'react';
// import { Button } from '../Button';
// import Unity, { UnityContent } from "react-unity-webgl";

// import '../../App.css';

// const unityContent = new UnityContent('../../../public/Build/Build/jojo.json', '../../../public/Build/Build/UnityLoader.js');

// export default function Services() {
//   // const [locked, setLocked] = useState('pending');

//   // const unlockHandler = e => {
//   //   setLocked(e.detail);
//   // }

//   // useEffect(() => {
//   //   window.addEventListener("unlockProtocol", unlockHandler);
//   //   return window.removeEventListener("unlockProtocol", unlockHandler);
//   // }, []);

//   // const unlock = () =>{
//   //   window.unlockProtocol && window.unlockProtocol.loadCheckoutModal();
//   // };

//   // function spawnEnemies() {
//   //   unityContent.send("GameController", "Next");
//   // }

//   return (
//     <>
//       {/* <button onClick={spawnEnemies}>Spawn a bunch!</button> */}
//       <Unity UnityContent={unityContent} />
//     </>
    
//     // <>
//     //   <h1 className='services'>SERVICES
    
//     //   <Button
//     //       className='btns'
//     //       buttonStyle='btn--primary'
//     //       buttonSize='btn--large'
//     //       onClick={unlock}
//     //     >
//     //       Unlock<i className='far fa-play-circle' />
//     //   </Button>
//     //   </h1>
//     //   {locked === 'unlocked' && 'Im unlocked'}
//     //   {locked !== 'unlocked' && <Button onClick={unlock}>Unlock</Button>}

      
//     // </>
//   );
// }