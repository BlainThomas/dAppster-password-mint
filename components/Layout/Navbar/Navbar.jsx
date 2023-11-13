import { useState } from 'react';
import { useRouter } from 'next/router';
import { useDisconnect } from 'wagmi'

export const Navbar = ({ brand }) => {
  const router = useRouter();
  const {disconnect} = useDisconnect()

  const walletRoute = '/wallet';
  const mintRoute = '/mint';
  const disconnectRoute = '/';
  const handleRouting = (path) => router.push(path);
  const handleDisconnect = () => {
    console.log("Attempting to disconnect..."); // Debug log
    disconnect();
    console.log("Disconnected. Redirecting..."); // Debug log
    handleRouting(disconnectRoute);
  };

  // Styles object for the navbar
  const navbarStyle = {
    position: 'fixed', // Fixed position to stay on top
    top: 0, // Align to the top of the viewport
    left: 0, // Align to the left of the viewport
    right: 0, // Stretch across the viewport
    height: '125px', // Set the height of the navbar
    padding: '0 1rem', // Add some horizontal padding
    alignItems: 'center', // Center items vertically
    backgroundColor: brand.componentColor, // Use brand's background color
    zIndex: 1000, // Ensure it's above other content
    width: '100%', // Ensure the width is responsive to the screen size
  };

  return (
    <nav style={navbarStyle}>
      <div className='flex justify-between'>
        <div className='flex justify-between'>
          <button
            style={{ backgroundColor: brand.buttonColor, color: brand.fontColor }}
            className='mt-10 mx-4 h-12 p-4 rounded-md flex items-center justify-center'
            onClick={() => handleRouting(mintRoute)}
          >
            Mint
          </button>
          <button
            style={{ backgroundColor: brand.buttonColor, color: brand.fontColor }}
            className='mt-10 mx-4 h-12 p-4 rounded-md flex items-center justify-center'
            onClick={() => handleRouting(walletRoute)}
          >
            Wallet
          </button>
        </div>
        <img
          src={brand.logoWithText}
          className='w-60 h-auto'
          alt="company logo"
          onClick={() => handleRouting(walletRoute)}
          style={{ cursor: 'pointer' }}
        />
        <div className='flex justify-between'>
          <a
            href='https://mumbaifaucet.com/'
            target="_blank"
            rel="noopener noreferrer"
            style={{ backgroundColor: brand.buttonColor, color: brand.fontColor }}
            className='mt-10 mx-4 h-12 p-4 rounded-md flex items-center justify-center'
          >
            Test Tokens
          </a>
          <button
          style={{ backgroundColor: brand.buttonColor, color: brand.fontColor }}
          className='mt-10 mx-4 h-12 p-4 rounded-md flex items-center justify-center'
          onClick={() => handleDisconnect()}
        >
          Disconnect
        </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
