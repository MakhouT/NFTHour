import axios from "axios";
import React from "react";
import Unity, { UnityContent } from "react-unity-webgl";
import * as Web3 from 'web3';
import Web3Modal from "web3modal";

export default class EnterGame extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      address: '',
      nfts: [ ],
    };

    this.unityContent = new UnityContent(
      '/Build/Build/1.json', 
      '/Build/Build/UnityLoader.js'
    );
  }

  previous() {
    this.unityContent.send("GameManager", "Previous");
  }

  next() {
    const availableBackgrounds = ['desert', 'city', 'suburbs', 'egypt', 'sea'];
    const names = this.state.nfts.map(nft => nft.name);
    const haveBackgrounds = availableBackgrounds.map(bg => names.includes(bg) ? '1' : '0').join('');
    console.log(haveBackgrounds);
 
    // this.unityContent.send("GameManager", "Next", this.state.nfts);
    this.unityContent.send("GameManager", "UnlockWithString", haveBackgrounds);
  }



  async getAddress() {
    const providerOptions = {};

    const web3Modal = new Web3Modal({
      providerOptions,
    });
    
    const providerWeb3 = await web3Modal.connect();
    const web3 = new Web3(providerWeb3);
    const address = web3.currentProvider.selectedAddress;

    this.setState({address});
    console.log(this.state);
  }
  async mint1(){

    if(!this.state.address){
      await this.getAddress();
    }
    const options = {
      method: 'POST',
      url: 'https://api.nftport.xyz/v0/mints/easy/urls',
      headers: {'Content-Type': 'application/json', Authorization: '4162f7a3-40f4-4f6b-8c8d-e735d3cc9590'},
      data: {
        chain: 'rinkeby',
        name: 'desert',
        description: 'Testing How it works!',
        file_url: 'https://cdn.vox-cdn.com/thumbor/GnlLz4NRbZjkEpSJWlrYHlItR1k=/1400x0/filters:no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/22443194/Clever_Lumimancer_EN.png',
        mint_to_address: '0xDc9e3501A6b49458A07dBd1CDa9473131f24a74F'
      }
    };
    
  
    axios.request(options).then(function (response) {
      console.log(response.data);
    }).catch(function (error) {
      console.error(error);
    });

  }

  async getNFTs() {
    if(!this.state.address){
      await this.getAddress();
    }

    axios.get(`https://api.nftport.xyz/v0/accounts/${this.state.address}`, {
      params: {
        chain: 'rinkeby',
      },
      headers: {
        'Content-Type': 'application/json', 
        'Authorization': '4162f7a3-40f4-4f6b-8c8d-e735d3cc9590'
      },
    })

    .then(function (response) {
      console.log(response);
      this.setState({
        ...this.state,
        nfts: response.nfts,

      });
      console.log(response.nfts);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    return (
      <div>
        <h1>  
        <button onClick={this.next.bind(this)}>Load NFTs</button>
        <button onClick={this.mint1.bind(this)}>Mint Background Card 1</button>
        {/* <button onClick={this.mint2.bind(this)}>Mint Background Card 2</button>
        <button onClick={this.mint3.bind(this)}>Mint Background Card 3</button>
        <button onClick={this.mint4.bind(this)}>Mint Background Card 4</button>
        <button onClick={this.mint5.bind(this)}>Mint Background Card 5</button> */}
        
        //
        {this.state.nfts.map(nft => (
          <div key={nft.token_id}>{nft.name}</div>
        ))}
       
         <Unity unityContent={this.unityContent} />
       
        </h1>  
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