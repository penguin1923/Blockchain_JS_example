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
        //part 2
        this.nonce = 0;
    }

    calculateHash()
    {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }

    //part 2
    mineBlock(difficulty)
    {
        while(this.hash.substring(0,difficulty) !== Array(difficulty + 1).join("0"))
        {
            this.nonce++;
            this.hash=this.calculateHash();
        }
        console.log("Block mined: "+this.hash);
    }
}

class Blockchain
{
    constructor()
    {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 4;
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
        //removed in part 2
        //newBlock.hash=newBlock.calculateHash();
        //added in part 2
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }
    //integrity verification
    isChainValid()
    {
        for(let i=1;i<this.chain.length;i++)
        {
            const currentBlock=this.chain[i];
            const previousBlock=this.chain[i-1];

            if(currentBlock.hash !== currentBlock.calculateHash())
            {
                return false;
            }

            if(currentBlock.previousHash !== previousBlock.hash)
            {
                return false;
            }
        }
        return true;
    }
}

let jennyFromTheBlock = new Blockchain();

//video 1 blocks
//created a couple of block for the purpose of seeing the chain play out
//jennyFromTheBlock.addBlock(new Block(1,"12/01/2021",{Jenny: "i got your number"}));
//jennyFromTheBlock.addBlock(new Block(2,"12/02/2021",{Jenny:"don't change your number"}));

//node main.js
//console.log(JSON.stringify(jennyFromTheBlock,null,4));

//test validity
//console.log('Is blockchain valid? '+ jennyFromTheBlock.isChainValid());

//test 1
//jennyFromTheBlock.chain[1].data = {Jenny: "i got your numbers"};
//console.log('Should be false: '+ jennyFromTheBlock.isChainValid());

//test 2
//jennyFromTheBlock.chain[1].data = {Jenny: "i got your number"};
//console.log('Should be true: '+ jennyFromTheBlock.isChainValid());

//test 3
//jennyFromTheBlock.chain[1].data = {Jenny: "i got your numbers"};
//jennyFromTheBlock.chain[1].hash = jennyFromTheBlock.chain[1].calculateHash();
//console.log('Should be false: '+ jennyFromTheBlock.isChainValid());

//video 2 blocks 
console.log('Mining Block 1...');
jennyFromTheBlock.addBlock(new Block(1,"12/01/2021",{Jenny: "i got your number"}));

console.log('Mining Block 2...');
jennyFromTheBlock.addBlock(new Block(2,"12/02/2021",{Jenny:"don't change your number"}));