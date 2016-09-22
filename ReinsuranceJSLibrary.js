//Billy's Reinsurance JavaScript Library

// 1) List the eth balance of all of your accounts
function checkAllBalances()
{
    var i = 0; eth.accounts.forEach(function (e)
    { console.log("  eth.accounts[" + i + "]: " + e + " \tbalance: " + web3.fromWei(eth.getBalance(e), "ether") + " ether"); i++; })
};

checkAllBalances();

// 2) List the eth balance of all of your accounts via a Contract
contract ownerbalancereturner {

    address owner;

    function ownerbalancereturner() public {
        owner = msg.sender;}

        function getOwnerBalance() constant returns (uint) {
            return owner.balance;}
        }

// 3) Scriptable-method to list the eth balance of all of your accounts
function checkAllBalances() { 
     var i =0; 
     var total = 0.0;
            eth.accounts.forEach( function(e){
                total += parseFloat(eth.getBalance(e));
                console.log("  eth.accounts["+i+"]: " +  e + " \tbalance: " +
                  web3.fromWei(eth.getBalance(e), "ether") + " ether"); 
                i++; 
            })
            console.log("total: " + web3.fromWei(total), "ether");
        }; 

checkAllBalances()

// 4) Mine only when there are transactions

var mining_threads = 1

function checkWork() {
    if (eth.getBlock("pending").transactions.length > 0) {
        if (eth.mining) return;
        console.log("== Pending transactions! Mining...");
        miner.start(mining_threads);
    } else {
        miner.stop(0);  // This param means nothing
        console.log("== No transactions! Mining stopped.");
    }
}

eth.filter("latest", function(err, block) { checkWork(); });
eth.filter("pending", function(err, block) { checkWork(); });

checkWork();

// 5) View a transaction
function printTransaction(txHash) {
    var tx = eth.getTransaction(txHash);
    if (tx != null) {
        console.log("  tx hash          : " + tx.hash + "\n"
          + "   nonce           : " + tx.nonce + "\n"
          + "   blockHash       : " + tx.blockHash + "\n"
          + "   blockNumber     : " + tx.blockNumber + "\n"
          + "   transactionIndex: " + tx.transactionIndex + "\n"
          + "   from            : " + tx.from + "\n" 
          + "   to              : " + tx.to + "\n"
          + "   value           : " + tx.value + "\n"
          + "   gasPrice        : " + tx.gasPrice + "\n"
          + "   gas             : " + tx.gas + "\n"
          + "   input           : " + tx.input);
    }
}

// 6) Print a block's details
function printBlock(block) {
    console.log("Block number     : " + block.number + "\n"
      + " hash            : " + block.hash + "\n"
      + " parentHash      : " + block.parentHash + "\n"
      + " nonce           : " + block.nonce + "\n"
      + " sha3Uncles      : " + block.sha3Uncles + "\n"
      + " logsBloom       : " + block.logsBloom + "\n"
      + " transactionsRoot: " + block.transactionsRoot + "\n"
      + " stateRoot       : " + block.stateRoot + "\n"
      + " miner           : " + block.miner + "\n"
      + " difficulty      : " + block.difficulty + "\n"
      + " totalDifficulty : " + block.totalDifficulty + "\n"
      + " extraData       : " + block.extraData + "\n"
      + " size            : " + block.size + "\n"
      + " gasLimit        : " + block.gasLimit + "\n"
      + " gasUsed         : " + block.gasUsed + "\n"
      + " timestamp       : " + block.timestamp + "\n"
      + " transactions    : " + block.transactions + "\n"
      + " uncles          : " + block.uncles);
    if (block.transactions != null) {
        console.log("--- transactions ---");
        block.transactions.forEach( function(e) {
            printTransaction(e);
        })
    }
}

// 7) Create insurance contract (Insurance Contract Asset Issuance contract)
contract tokenRecipient { function receiveApproval(address _from, uint256 _value, address _token, bytes _extraData); }

    contract MyToken {
        /* Public variables of the token */
        string public standard = 'Token 0.1';
        string public name;
        string public identifier;
        uint256 public claim;
        uint8 public decimals;
        uint256 public totalSupply;
        string public contractType;
        string public coveredRisk;
        string public deductible;
        string public contractCurrency;
        string public jurisdiction;
        string public premium;
        string public premiumType;

        /* This creates an array with all balances */
        mapping (address => uint256) public balanceOf;
        mapping (address => mapping (address => uint256)) public allowance;

        /* This generates a public event on the blockchain that will notify clients */
        event Transfer(address indexed from, address indexed to, uint256 value);

        /* Initializes contract with initial supply tokens to the creator of the contract */
        function MyToken(
            uint256 initialSupply,
            string tokenName,
            uint8 decimalUnits,
            string tokenIdentifier,
            uint256 claimValue,
            uint8 decimals,
            uint256 totalSupply,
            string contractType,
            string coveredRisk,
            string deductible,
            string contractCurrency,
            string jurisdiction,
            string premium,
            string premiumType
            ) {
            balanceOf[msg.sender] = initialSupply;              // Give the creator all initial tokens
            totalSupply = initialSupply;                        // Update total supply
            name = tokenName;                                   // Set the name for display purposes
            identifier = tokenIdentifier;                       // Set the unique identifier of the contract
            decimals = decimalUnits;                            // Amount of decimals for display purposes
            claim = claimValue;									// Amount of the claim of the insurance contract
            decimals = decimals;
            totalSupply = totalSupply;
            contractType = contractType;                        //All variables from this point forward are insurance-related
            coveredRisk = coveredRisk;
            deductible = deductible;
            contractCurrency = contractCurrency;
            jurisdiction = jurisdiction;
            premium = premium;
            premiumType = premiumType;
        }

        /* Send coins */
        function transfer(address _to, uint256 _value) {
            if (balanceOf[msg.sender] < _value) throw;           // Check if the sender has enough
            if (balanceOf[_to] + _value < balanceOf[_to]) throw; // Check for overflows
            balanceOf[msg.sender] -= _value;                     // Subtract from the sender
            balanceOf[_to] += _value;                            // Add the same to the recipient
            Transfer(msg.sender, _to, _value);                   // Notify anyone listening that this transfer took place
        }

            /* Allow another contract to spend some tokens in your behalf */
            function approveAndCall(address _spender, uint256 _value, bytes _extraData)
                returns (bool success) {
                allowance[msg.sender][_spender] = _value;
                tokenRecipient spender = tokenRecipient(_spender);
                spender.receiveApproval(msg.sender, _value, this, _extraData);
                return true; 
            }

            /* A contract attempts to get the coins */
            function transferFrom(address _from, address _to, uint256 _value) returns (bool success) {
                if (balanceOf[_from] < _value) throw;                 // Check if the sender has enough
                if (balanceOf[_to] + _value < balanceOf[_to]) throw;  // Check for overflows
                if (_value > allowance[_from][msg.sender]) throw;   // Check allowance
                balanceOf[_from] -= _value;                          // Subtract from the sender
                balanceOf[_to] += _value;                            // Add the same to the recipient
                allowance[_from][msg.sender] -= _value;
                Transfer(_from, _to, _value);
                return true;
            }

            /* This unnamed function is called whenever someone tries to send ether to it */
            function () {
                throw;     // Prevents accidental sending of ether
            }
        }

// 8) Return contract token balance for all accounts
    // NOTE: ABI is configured for the Insurance Contract Asset Issuance contract ONLY
    // NOTE: Any changes made to the Insurance Contract Asset Issuance contract code will change the ABI
    // NOTE: var contractAddress needs to be configured to the address of the insurance contract
function padTokens(s, n) {
    var o = s.toPrecision(n);
    while (o.length < n) {
        o = " " + o;
    }
    return o;
}

function padEthers(s) {
    var o = s.toFixed(18);
    while (o.length < 27) {
        o = " " + o;
    }
    return o;
}

function checkAllBalances() { 
    var contractABI = [{ "constant": true, "inputs": [], "name": "name", "outputs": [{ "name": "", "type": "string" }], "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "name": "", "type": "uint256" }], "type": "function" }, { "constant": true, "inputs": [], "name": "deductible", "outputs": [{ "name": "", "type": "string" }], "type": "function" }, { "constant": false, "inputs": [{ "name": "_from", "type": "address" }, { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "name": "success", "type": "bool" }], "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "name": "", "type": "uint8" }], "type": "function" }, { "constant": true, "inputs": [], "name": "claim", "outputs": [{ "name": "", "type": "uint256" }], "type": "function" }, { "constant": true, "inputs": [], "name": "standard", "outputs": [{ "name": "", "type": "string" }], "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }], "name": "balanceOf", "outputs": [{ "name": "", "type": "uint256" }], "type": "function" }, { "constant": true, "inputs": [], "name": "identifier", "outputs": [{ "name": "", "type": "string" }], "type": "function" }, { "constant": true, "inputs": [], "name": "jurisdiction", "outputs": [{ "name": "", "type": "string" }], "type": "function" }, { "constant": true, "inputs": [], "name": "coveredRisk", "outputs": [{ "name": "", "type": "string" }], "type": "function" }, { "constant": false, "inputs": [{ "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "transfer", "outputs": [], "type": "function" }, { "constant": false, "inputs": [{ "name": "_spender", "type": "address" }, { "name": "_value", "type": "uint256" }, { "name": "_extraData", "type": "bytes" }], "name": "approveAndCall", "outputs": [{ "name": "success", "type": "bool" }], "type": "function" }, { "constant": true, "inputs": [], "name": "contractType", "outputs": [{ "name": "", "type": "string" }], "type": "function" }, { "constant": true, "inputs": [], "name": "premiumType", "outputs": [{ "name": "", "type": "string" }], "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }, { "name": "", "type": "address" }], "name": "allowance", "outputs": [{ "name": "", "type": "uint256" }], "type": "function" }, { "constant": true, "inputs": [], "name": "premium", "outputs": [{ "name": "", "type": "string" }], "type": "function" }, { "constant": true, "inputs": [], "name": "contractCurrency", "outputs": [{ "name": "", "type": "string" }], "type": "function" }, { "inputs": [{ "name": "initialSupply", "type": "uint256" }, { "name": "tokenName", "type": "string" }, { "name": "decimalUnits", "type": "uint8" }, { "name": "tokenIdentifier", "type": "string" }, { "name": "claimValue", "type": "uint256" }, { "name": "decimals", "type": "uint8" }, { "name": "totalSupply", "type": "uint256" }, { "name": "contractType", "type": "string" }, { "name": "coveredRisk", "type": "string" }, { "name": "deductible", "type": "string" }, { "name": "contractCurrency", "type": "string" }, { "name": "jurisdiction", "type": "string" }, { "name": "premium", "type": "string" }, { "name": "premiumType", "type": "string" }], "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "from", "type": "address" }, { "indexed": true, "name": "to", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }];
    var contractAddress = "0x5f5c55a5065DE7b7Efb697EbAE5531E1bd66E455"; // Input the address of your contract
    var theContract = eth.contract(contractABI).at(contractAddress);
    var contractTotal = 0; 
    var ethersTotal = 0; 

    console.log("  #     Account                                   % Liability                      ether");
    console.log("------- ------------------------------------------ ---------- ---------------------------");
    var i =0; 
    eth.accounts.forEach( function(e){
        var tokens = theContract.balanceOf(e);
        contractTotal += parseFloat(tokens);
        var ethers = web3.fromWei(eth.getBalance(e), "ether");
        ethersTotal += parseFloat(ethers);
        console.log("  " + i + "\t" + e + " " + padTokens(tokens, 10) + " " + padEthers(ethers)); 
        i++; 
    })
    console.log("------- ------------------------------------------ ---------- ---------------------------");
    console.log("  " + i + "                                               " + padTokens(contractTotal, 10) + " " + padEthers(ethersTotal));
}; 

checkAllBalances()

