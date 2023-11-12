import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { Layout, PageHeader, NFT } from '../components'
import { useAccount, useContractReads, useContractRead, useBalance } from 'wagmi';
import { useWalletConfig } from '../providers/ConfigProvider';

export default function Wallet() {
  const { brand } = useWalletConfig();
  const { address } = useAccount();
  const [ownerAddress, setownerAddress ] = useState('0xedFFDf7eD1647c6323401f7689869e4E01F55E37');
  const [userBalance, setUserBalance ] = useState();
  const [ownedTokenIds, setOwnedTokenIds ] = useState([]);
  const [error, setError ] = useState();

  const { data: walletBalance } = useBalance({ ownerAddress });

  const { data: balanceOf } = useContractRead({
    ...brand.mintContract,
    functionName: 'totalSupply',
  });

  const balanceOfNumber = balanceOf ? Number(balanceOf) : 0;

  const contractReads = Array.from({ length: balanceOfNumber }, (_, i) => ({
    ...brand.mintContract,
    functionName: 'ownerOf',
    args: [i + 1],
  }));

  const { data } = useContractReads({
    contracts: contractReads,
    enabled: Boolean(ownerAddress),
  });

  useEffect(() => {
    if(address)
      setownerAddress(address)
    if (data && ownerAddress) {
      try {
        const ownedTokensTemp = data.reduce((acc, owner, index) => {
          if (!owner.error && owner.result.toLowerCase() === ownerAddress.toLowerCase()) {
          acc.push(index + 1);
          }
          return acc;
        }, []);
        setOwnedTokenIds(ownedTokensTemp);
      } catch (error) {
        console.error("Error processing owned tokens:", error);
        setError("Failed to process owned tokens. Please try again later.");
      }
    }
  }, [data, balanceOfNumber, address ]);

  return (
    <Layout>
      <div 
        style={{ backgroundColor: brand.componentColor, color: brand.fontColor}}
        className="flex flex-col mt-20 items-center w-[800px] p-24 mx-auto rounded-xl"
      >
        <PageHeader brand={brand} headerText={`Wallet`} />
        <Typography style={{ color: brand.border }} className='text-center md:text-left pb-4' variant="h5">{ownerAddress} </Typography>
        <div style={{ backgroundColor: brand.component, borderColor: brand.borderColor, color: brand.fontColor }} className="p-6 rounded-lg shadow-xl border-t-8 mb-8 w-11/12 mx-auto" >
          <Typography style={{ color: brand.border }} className='text-center md:text-left pb-4' variant="h4">NFTS</Typography>
          <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-5 gap-4 w-11/12 ">
            {ownedTokenIds.map(id => (
              <NFT key={id} id={id} brand={brand} />
            ))}
          </div>
        </div>
        <div style={{ backgroundColor: brand.component, borderColor: brand.borderColor, color: brand.fontColor }} className="p-6 rounded-lg shadow-xl border-t-8 mb-8 w-11/12 mx-auto" >
          <Typography style={{ color: brand.border }} className='text-center md:text-left pb-4' variant="h4">Balances</Typography>
          {brand.erc20Contracts.length > 0 && brand.erc20Contracts.map(token => (
            <ERC20 brand={brand} key={token.ticker} token={token} />
          ))}
        </div>
      </div>
    </Layout>
  );
}
