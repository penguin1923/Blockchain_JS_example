const SHA256 = require('crypto-js/sha256');

class Transaction
{
    constructor(fromAddress,toAddress,amount)
    {
        this.fromAddress=fromAddress;
        this.toAddress=toAddress;
        this.amount=amount;
    }
}

class Block
{
    constructor(timestamp,transactions,previousHash ='')
    {
        //removed in video 3
        //this.index=index;
        this.timestamp=timestamp;
        this.transactions=transactions;
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
        this.pendingTransactions=[];
        this.miningReward=100;
    }

    createGenesisBlock()
    {
        return new Block("11/30/2021","starting block","8675309");
    }

    getLatestBlock()
    {
        return this.chain[this.chain.length-1];
    }

    /*Removed in video 3
    addBlock(newBlock)
    {
        newBlock.previousHash=this.getLatestBlock().hash;
        //removed in part 2
        //newBlock.hash=newBlock.calculateHash();
        //added in part 2
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }*/

    //replaced addBlock()
    minePendingTransactions(miningRewardAddress)
    {
        let block= new Block(Date.now(),this.pendingTransactions);
        block.mineBlock(this.difficulty);

        console.log('Block successfully mined!');
        this.chain.push(block);

        this.pendingTransactions =
        [
            new Transaction(null,miningRewardAddress,this.miningReward)
        ];
    }

    createTransaction(transaction)
    {
        this.pendingTransactions.push(transaction);
    }

    getBalanceOfAddress(address)
    {
        let balance=0;

        for(const block of this.chain)
        {
            for(const trans of block.transactions)
            {
                if(trans.fromAddress === address)
                {
                    balance -= trans.amount;
                }
                if(trans.toAddress === address)
                {
                    balance += trans.amount;
                }
            }
        }
        return balance;
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
//console.log('Mining Block 1...');
//jennyFromTheBlock.addBlock(new Block(1,"12/01/2021",{Jenny: "i got your number"}));

//console.log('Mining Block 2...');
//jennyFromTheBlock.addBlock(new Block(2,"12/02/2021",{Jenny:"don't change your number"}));

//video 3 blocks
jennyFromTheBlock.createTransaction(new Transaction('address1','address2',100));
jennyFromTheBlock.createTransaction(new Transaction('address2','address1',53));

console.log('\n Starting the miner...');
jennyFromTheBlock.minePendingTransactions('jennys-wallet');

console.log('\n Balance of Jennys wallet is ', jennyFromTheBlock.getBalanceOfAddress('jennys-wallet'));
console.log('\n Balance of address1 wallet is ', jennyFromTheBlock.getBalanceOfAddress('address1'));
console.log('\n Balance of address2 wallet is ', jennyFromTheBlock.getBalanceOfAddress('address2'));

console.log('\n Starting the miner...');
jennyFromTheBlock.minePendingTransactions('jennys-wallet');

console.log('\n Balance of Jennys wallet is ', jennyFromTheBlock.getBalanceOfAddress('jennys-wallet'));
console.log('\n Balance of address1 wallet is ', jennyFromTheBlock.getBalanceOfAddress('address1'));
console.log('\n Balance of address2 wallet is ', jennyFromTheBlock.getBalanceOfAddress('address2'));