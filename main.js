const SHA256 = require('crypto-js/sha256');

class Block
{
    constructor(index,timestamp,data,previousHash ='')
    {
        this.index=index;
        this.timestamp=timestamp;
        this.data=data;
        this.previousHash=previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash()
    {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class Blockchain
{
    constructor()
    {
        this.chain=[this.createGenesisBlock()];
    }

    createGenesisBlock()
    {
        return new Block(0,"11/30/2021","starting block","8675309");
    }

    getLatestBlock()
    {
        return this.chain[this.chain.length-1];
    }

    addBlock(newBlock)
    {
        newBlock.previousHash=this.getLatestBlock().hash;
        newBlock.hash=newBlock.calculateHash();
        this.chain.push(newBlock);
    }
}

let jennyFromTheBlock = new Blockchain();

//created a couple of block for the purpose of seeing the chain play out
jennyFromTheBlock.addBlock(new Block(1,"12/01/2021",{Jenny: "i got your number"}));
jennyFromTheBlock.addBlock(new Block(2,"12/02/2021",{Jenny:"don't change your number"}));
//node main.js
console.log(JSON.stringify(jennyFromTheBlock,null,4));