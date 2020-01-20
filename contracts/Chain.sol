pragma solidity ^0.5.0;

contract Chain {

  uint public memeTotal = 0;
  mapping(uint => Meme) public memes;

  struct Meme {
    string text;
    uint memeID;
    string username;
    string timestamp;
  }

  event MemeCreated(
    string text,
    uint id,
    string username,
    string timestamp
  );

  constructor() public {
    createMeme("When you deploy a meme machine on blockchain", 0, "0x1cDa2c61927B9D13258A780d741Ee337bd38698d", "Mon, 20 Jan 2020 09:37:40 GMT");
  }

  // creates a new Meme with text and id
  function createMeme(string memory _text, uint _id, string memory _username, string memory _timestamp) public {
    memeTotal++;
    memes[memeTotal] = Meme(_text, _id, _username, _timestamp);
    emit MemeCreated(_text, _id, _username, _timestamp);
  }

}
