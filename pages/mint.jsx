import { useEffect, useState } from 'react';
import { Typography, TextField } from '@mui/material';
import { Layout, PageHeader } from '../components'
import { polygonMumbai } from 'wagmi/chains';
import { usePrepareContractWrite, useContractWrite, useContractRead } from 'wagmi';
import { useWalletConfig } from '../providers/ConfigProvider';

export default function Wallet() {
  const { brand } = useWalletConfig();
  const [ tokenId, setTokenId ] = useState(0);
  const [ tokenPassword, setTokenPassword ] = useState('');

  const { config } = usePrepareContractWrite({
    ...brand.mintContract,
    functionName: 'safeMint',
    chainId: polygonMumbai.id,
    args: [tokenId, tokenPassword]
  });

const { write: claimMint } = useContractWrite({...config})

const handleTokenIdChange = (event) => {
  const value = event.target.value;
  setTokenId(value.replace(/[^0-9]/g, ''));
};

  return (
    <Layout>
      <div 
        style={{ backgroundColor: brand.componentColor, color: brand.fontColor}}
        className="flex flex-col mt-20 items-center w-[800px] p-24 mx-auto rounded-xl"
      >
        <PageHeader brand={brand} headerText={`Mint`} />
        <Typography variant="h2" style={{ color: brand.fontColor }}>
          Claim Your Mint
        </Typography>
        <TextField
          label="Token ID"
          variant="outlined"
          value={tokenId}
          onChange={handleTokenIdChange}
          type="number"
          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
          style={{ margin: '10px 0' }}
        />
        <TextField
          label="Token Password"
          variant="outlined"
          value={tokenPassword}
          onChange={(e) => setTokenPassword(e.target.value)}
          type="password"
          style={{ margin: '10px 0' }}
        />
        <button
          style={{ backgroundColor: brand.buttonColor, color: brand.fontColor }}
          className='mt-6 mx-4 h-12 p-4 rounded-md flex items-center justify-center'
          onClick={() => claimMint()}
        >
          Mint
        </button>
      </div>
    </Layout>
  );
}
