//logos
import banner from './assets/icons/logos/banner.png';
import { MintContract } from "./utils/contracts";

// Brand Info
export const defualtBrand = {
  Name: 'The Original dAppster',
  coin: 'dApp',
  fontColor: '#F05941',
  backgroundColor: '#22092C',
  componentColor: '#872341',
  borderColor: '#BE3144',
  buttonColor: '#22092C',
  buttonColorHover: '#BE3144',
  iconColor: '#F05941',
  logoWithText: banner.src,
  borderRadius: 20,
  mintContract: {
    address: '0x299827509b2ddA870638d7808BB498fe8183C102',
    abi: MintContract.abi
  },
  erc20Contracts: [],
};
