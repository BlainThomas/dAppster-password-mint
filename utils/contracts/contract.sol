// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyToken is ERC721, ERC721Pausable, Ownable {
    // Base token URI
    string private _baseTokenURI;
    uint256 public _totalSupply;

    // Mapping from token ID to password hash
    mapping(uint256 => bytes32) private _tokenPasswords;

    // Mapping from token ID to exist
    mapping(uint256 => bool) private _exists;


    // Custom modifier to check if token exists
    modifier tokenExists(uint256 tokenId) {
        require(_exists[tokenId] == true, "Token does not exist");
        _;
    }

    constructor(string memory baseURI, string memory tokenName, string memory tokenTicker, uint256 setTotalSupply)
        ERC721(tokenName, tokenTicker)
        Ownable(msg.sender)
    {
        _baseTokenURI = baseURI;
        _totalSupply = setTotalSupply;
    }

    // Function to return the total supply of tokens
    function totalSupply() public view returns (uint256) {
        return _totalSupply;
    }

    // Set password hashes for multiple token IDs
    function setPasswords(uint256[] memory tokenIds, string[] memory passwords) public onlyOwner {
        require(tokenIds.length == passwords.length, "Token and password array length mismatch");
        for (uint256 i = 0; i < tokenIds.length; i++) {
            _tokenPasswords[tokenIds[i]] = keccak256(abi.encodePacked(passwords[i]));
        }
    }

    // Set password hash for a specific token ID
    function setPassword(uint256 tokenId, string memory password) public onlyOwner {
        _tokenPasswords[tokenId] = keccak256(abi.encodePacked(password));
    }

    // Override the safeMint function to include password verification
    function safeMint(uint256 tokenId, string memory password) public {
        if(keccak256(abi.encodePacked(_tokenPasswords[tokenId])) != keccak256(abi.encodePacked(password))){
            return;
        }
        _safeMint(msg.sender, tokenId);
        // Clear the password hash after minting to prevent re-use
        delete _tokenPasswords[tokenId];
        _exists[tokenId] = true;
    }

    function setBaseURI(string memory baseURI) public onlyOwner {
        _baseTokenURI = baseURI;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return _baseTokenURI;
    }

    function tokenURI(uint256 tokenId) public view virtual override tokenExists(tokenId) returns (string memory) {

        string memory baseURI = _baseURI();
        return bytes(baseURI).length > 0
            ? string(abi.encodePacked(baseURI, Strings.toString(tokenId), ".json"))
            : '';
    }

    function _update(address to, uint256 tokenId, address auth) internal override(ERC721, ERC721Pausable) returns (address) {
        // If you want to call ERC721's _update function
        return super._update(to, tokenId, auth);
        // Or, if you want to call ERC721Pausable's _update function
        // return ERC721Pausable._update(to, tokenId, auth);
        // Or, if you want a custom implementation, provide it here
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

}
