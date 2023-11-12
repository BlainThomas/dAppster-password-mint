import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Typography } from '@mui/material';
// WAGMI
import { useAccount, useConnect } from 'wagmi';
import { walletConfig, useWalletConfig} from '../providers/ConfigProvider';


export default function Login() {
  const router = useRouter();
  const { brand } = useWalletConfig();
  const { isConnected } = useAccount();
  const { connect, connectors, isLoading } = useConnect({
    onSuccess() {
      router.push('/mint');
    },
  });

  const walletImage = (id) => {
    return walletConfig[id]?.icon;
  };

  const handleConnect = async (x) => {
    if (isConnected) {
      router.push('/mint');
    } else {
      try {
        await connect({ connector: x });
      } catch (error) {
        console.error("Failed to connect wallet:", error);
      }
    }
  };

  return (
    <section style={{ backgroundColor: brand.backgroundColor}} className="flex justify-center items-center h-screen bg-contain bg-center overflow-auto">
      <div style={{ backgroundColor: brand.componentColor, color: brand.fontColor}}
        className="flex flex-col items-center w-[500px] h-[fit-content] px-24 pt-12 rounded-[12px]">
          <img
            src={brand.logoWithText}
            alt="Logo"
            width="auto"
            height="50"
          />
        <div className="flex flex-col gap-2 text-center mt-6">
          <Typography style={{ color: brand.fontColor }} variant="h1">
            {brand.brandName}
          </Typography>
          <Typography style={{ color: brand.fontColor }} variant="h4">
            Please connect your wallet
          </Typography>
          <div className="h-[200px] flex items-center justify-center">
            {isLoading ? (
              <Typography variant="subtitle2" className="mb-5">
                Connecting
              </Typography>
            ) :  (
              connectors.map((x) => (
                <button key={x.id} onClick={() => handleConnect(x)}>
                  <Image
                    src={walletImage(x.id)}
                    width={100}
                    height={100}
                    className="mx-auto mt-2 mb-8 p-2"
                    alt="Wallet Icon"
                  />
                </button>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}