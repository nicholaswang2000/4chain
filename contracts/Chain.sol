pragma solidity ^0.5.0;

contract Chain {

  uint public memeTotal = 0;
  mapping(uint => Meme) public memes;

  struct Meme {
    string text;
    uint memeID;
    string username;
  }

  event MemeCreated(
    string text,
    uint id,
    string username
  );

  constructor() public {
    createMeme("When you deploy a meme machine on blockchain", 0, "nicholaswang");
  }

  // creates a new Meme with text and id
  function createMeme(string memory _text, uint _id, string memory _username) public {
    memeTotal++;
    memes[memeTotal] = Meme(_text, _id, _username);
    emit MemeCreated(_text, _id, _username);
  }

}
