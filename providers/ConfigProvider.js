import React, { useState, createContext, useContext } from 'react';
// WAGMI
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { polygonMumbai } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { CoinBase, MetaMask, WalletConnect } from '../assets/icons/wallets';
import { defualtBrand } from '../config';


const { chains, publicClient, webSocketPublicClient } = configureChains(
  [ polygonMumbai ],
  [publicProvider()]
);

let projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_API ? process.env.NEXT_PUBLIC_WALLETCONNECT_API : "";

export const walletConfig = {
  metaMask: {
    icon: MetaMask,
  },
  coinbaseWallet: {
    icon: CoinBase,
  },
  walletConnect: {
    icon: WalletConnect,
  },
};

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'wagmi',
      },
    }),
    new WalletConnectConnector({
      chains,
      options: { projectId },
    })
  ],
  publicClient,
  webSocketPublicClient,
});

const defaultContextValue = {
  walletConfig: walletConfig, 
  brand: defualtBrand,
  setBrand: () => {}
};

const WalletConfigContext = createContext(defaultContextValue);

export const useWalletConfig = () => {
  return useContext(WalletConfigContext);
};

const WalletProvider = ({ children }) => {
  const [brand, setBrand] = useState(defualtBrand);

  return (
    <WalletConfigContext.Provider value={{ walletConfig, brand, setBrand }}>
      <WagmiConfig config={wagmiConfig}>
        {children}
      </WagmiConfig>
    </WalletConfigContext.Provider>
  );
};


export default WalletProvider;
