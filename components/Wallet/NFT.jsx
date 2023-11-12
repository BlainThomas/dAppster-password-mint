import React, { useState, useEffect } from 'react';
import { useContractRead } from 'wagmi';

export function NFT({ id, brand }) {
  const { data: tokenURI } = useContractRead({
    ...brand.mintContract,
    functionName: 'tokenURI',
    args: [id],
  });

  const [imageURL, setImageURL] = useState(null);
  const [metadata, setMetadata] = useState(null); // State to store the metadata

  useEffect(() => {
    const fetchImageURL = async (tokenURI) => {
      try {
        const response = await fetch(tokenURI);
        const jsonData = await response.json();
        console.log(jsonData); // This will print the JSON to the console
        setImageURL(jsonData.image);
        setMetadata(jsonData); // Store the metadata in state
      } catch (error) {
        console.error("Error fetching image URL:", error);
      }
    };

    if (tokenURI) {
      fetchImageURL(tokenURI);
    }
  }, [tokenURI]);

  // Function to render JSON data prettily
  const renderMetadata = (metadata) => {
    return (
      <pre>{JSON.stringify(metadata, null, 2)}</pre> // Pretty print JSON
    );
  };

  return (
    <div className='m-2'>
      {imageURL && <img className='w-60' src={imageURL} alt="NFT" />}
      {metadata && renderMetadata(metadata)} {/* Render the JSON data here */}
    </div>
  );
}
