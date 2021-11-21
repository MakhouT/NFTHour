import axios from "axios";
import React from "react";
import Unity, { UnityContent } from "react-unity-webgl";
import * as Web3 from 'web3';
import Web3Modal from "web3modal";
export default class Services extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      address: '',
      nfts: [
        {
          "contract_address": "KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton",
          "token_id": "159383",
          "name": "suburbs",
          "description": "Cool description",
          "file_url": "ipfs://QmVkyU2c6ade8su1UKqSSx6iNLDp6zrCMUGX8DrRFcm9mq",
          "cached_file_url": "https://storage.googleapis.com/sentinel-nft/raw-assets/c_0x12f28e2106ce8fd8464885b80ea865e98b465149_t_100030071_raw_asset.png",
          "creator_address": "tz1dVxdJwpJixh6Kcd5FZULTfFcR98V7Z2fw",
          "metadata": {
            "description": "ok first off it's a fucking dollar, if you need extra convincing from some BS artist's notes wether you want to spend a dollar on this i will punch you in the god damn face. smash the buy button ya jabroni.",
            "background_color": "ffffff",
            "external_url": "https://niftygateway.com/#/",
            "image": "https://res.cloudinary.com/nifty-gateway/video/upload/v1603975889/Beeple/POLITICAL_BULLSHIT_uqbc8x.png",
            "name": "POLITICS IS BULLSHIT #71/100",
            "animation_url": "https://res.cloudinary.com/nifty-gateway/video/upload/v1603975889/Beeple/POLITICAL_BULLSHIT_uqbc8x.mp4"
          }
        },
        {
          "contract_address": "KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton",
          "token_id": "15938443",
          "name": "desert",
          "description": "Cool description",
          "file_url": "ipfs://QmVkyU2c6ade8su1UKqSSx6iNLDp6zrCMUGX8DrRFcm9mq",
          "cached_file_url": "https://storage.googleapis.com/sentinel-nft/raw-assets/c_0x12f28e2106ce8fd8464885b80ea865e98b465149_t_100030071_raw_asset.png",
          "creator_address": "tz1dVxdJwpJixh6Kcd5FZULTfFcR98V7Z2fw",
          "metadata": {
            "description": "ok first off it's a fucking dollar, if you need extra convincing from some BS artist's notes wether you want to spend a dollar on this i will punch you in the god damn face. smash the buy button ya jabroni.",
            "background_color": "ffffff",
            "external_url": "https://niftygateway.com/#/",
            "image": "https://res.cloudinary.com/nifty-gateway/video/upload/v1603975889/Beeple/POLITICAL_BULLSHIT_uqbc8x.png",
            "name": "POLITICS IS BULLSHIT #71/100",
            "animation_url": "https://res.cloudinary.com/nifty-gateway/video/upload/v1603975889/Beeple/POLITICAL_BULLSHIT_uqbc8x.mp4"
          }
        }
      ],
    };

    this.unityContent = new UnityContent(
      '/Build/Build/jojo.json', 
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
    this.unityContent.send("GameManager", "Next");
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

  async getNFTs() {
    if(!this.state.address){
      await this.getAddress();
    }

    axios.get(`https://api.nftport.xyz/v0/accounts/${this.state.address}`, {
      params: {
        chain: 'polygon',
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
        nfts: response.nfts
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    return (
      <div>
        <button onClick={this.previous.bind(this)}>PREVIOUS</button>
        <button onClick={this.next.bind(this)}>NEXT</button>
        <button onClick={this.getNFTs.bind(this)}>Get NFTs</button>

        {this.state.nfts.map(nft => (
          <div key={nft.token_id}>{nft.name}</div>
        ))}
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