Decentralized Twitter
=====================

This repository contains the code of a decentralized microblogging service running on the [Ethereum](https://ethereum.org) blockchain.

The service provides basic Twitter-like functionality to tweet messages of up to 160 characters.

Here, `decentralization` means there is no company or central authority in control of what is being published.

The system is `censorship resistant` in the sense that once a message is published, it can only be removed by the publisher.

All accounts can receive `donations` in Ethereum's Ether crypto currency. Being able to receive donations can be an incentive to run a decentralized microblogging feed.

To not expose the user's social graph to the world, following other accounts is not supported on purpose.

If you want to edit the source files, you can use Ethereum's Mix IDE which can be found [here](https://github.com/ethereum/webthree-umbrella/releases). In the repository, there is a Mix IDE project file called `.mix`, it also contains some test cases used during development. Mix can simulate a local blockchain for testing.

Contents
--------

 - [Install](#install)
 - [Read Tweets in the Web Browser](#read-tweets-in-the-web-browser)
 - [Using the Geth Command Line](#using-the-geth-command-line)
 - [Read Tweets on the Command Line](#read-tweets-on-the-command-line)
 - [Ether](#ether)
 - [Create an Account](#create-an-account)
 - [Post a new Tweet](#post-a-new-tweet)
 - [Register Account Name](#register-account-name)
 - [Browse Accounts](#browse-accounts)
 - [Solidity API](#solidity-api)
 - [Web3 Javascript API](#web3-javascript-api)
 - [Contributors](#contributors)


Install
-------

[Install geth](https://www.ethereum.org/cli) and start it by entering

`geth --rpc --rpccorsdomain="http://ethertweet.net"`


Read Tweets in the Web Browser
------------------------------

With geth running, open [http://ethertweet.net/ui](http://ethertweet.net/ui) in your web browser.

You should see a menu of existing accounts and the corresponding tweets, as shown in this picture:

![EtherTweetScreenshot](http://ethertweet.net/EtherTweetScreenshot.png)


Using the Geth Command Line
---------------------------

Posting tweets is not yet supported using the web browser. Instead, you have to use the geth command line.

After starting geth as shown above, open a second shell and start the interactive geth interface by running

`geth attach`

Your prompt should change to `>`

As a test, get the status by entering:

`> eth`

You should see various ethereum statistics like the current block number.

All commands below assume you are in the interactive geth interface.


Read Tweets on the Command Line
-------------------------------

An example how to read tweets of an existing account.

See section `Browse Accounts` below, to learn how to explore all existing accounts.

Create a local variable `TweetAccount` to point to the existing account. Here, the address of the test account `0x9e82d1745c6c9c04a6cfcde102837cf0f25efc56` is used. Change this address in the code block below to read tweets of other accounts.

Copy the following code block and paste it into the interactive geth interface:

```
var TweetAccount = web3.eth.contract([{"constant":true,"inputs":[],"name":"getOwnerAddress","outputs":[{"name":"adminAddress","type":"address"}],"type":"function"},{"constant":false,"inputs":[],"name":"adminDeleteAccount","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"receiver","type":"address"}],"name":"adminRetrieveDonations","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"getLatestTweet","outputs":[{"name":"tweetString","type":"string"},{"name":"timestamp","type":"uint256"},{"name":"numberOfTweets","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"isAdmin","outputs":[{"name":"isAdmin","type":"bool"}],"type":"function"},{"constant":true,"inputs":[{"name":"tweetId","type":"uint256"}],"name":"getTweet","outputs":[{"name":"tweetString","type":"string"},{"name":"timestamp","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"getNumberOfTweets","outputs":[{"name":"numberOfTweets","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[{"name":"tweetString","type":"string"}],"name":"tweet","outputs":[{"name":"result","type":"int256"}],"type":"function"},{"inputs":[],"type":"constructor"}]).at("0x9e82d1745c6c9c04a6cfcde102837cf0f25efc56"); TweetAccount
````

Get latest tweet of the account with:

`TweetAccount.getLatestTweet()`

Expected result is:

`["hello world", 1446832323, 1]`

The resulting JSON array contains: `[tweet string, timestamp of tweet, total number of tweets]`.

Use a tool like [unixtimestamp.com](http://www.unixtimestamp.com) to convert timestamps.

Get total number of tweets:

`TweetAccount.getNumberOfTweets()`

Get a specific tweet. For example, get the first tweet, tweet number 0:

`TweetAccount.getTweet(0)`


Ether
-----

For account creation, registration and tweeting, you have to get Ethereum's crypto currency `Ether`. You can either buy `Ether` for Dollar/Euro or trade `Ether` for Bitcoin. Instructions can be found here: [ethereum.org/ether](https://www.ethereum.org/ether). For example, you can use the [kraken.com](https://kraken.com) crypto currency exchange.

Pricing is as following:

| Date          | Account Creation      | Price per Tweet
| --------------|-----------------------|--------------------------------|
| 2015 December | `0.02384905 ether` or | `0.00420185 ether` or          |
|               | `$0.020`/`€0,018`  or | `$0.003`/`€0.003`              |
|               | `roughly 2 cents`     | `roughly one third of a cent`  |
| 2016 March    | `0.00772476 ether` or | `0.00182126` ether or          |
|               | `$0.10`/`€0.09` or    | `$0.02`/`€0.02` or             |
|               | `roughly 10 cents`    | `roughly two cents`            |


For current rates see the currency pairs `eth/usd` or `eth/eur` on [kraken.com/charts](https://www.kraken.com/charts).

If you like this project, please consider sending donations in Ether to `0x93a4a6c05c5cfb945f6ccaea223723561670c204` or donations in Bitcoin to `3PyW7MNRJzpw13JFVendeTFt7dcXmFq4pd`.


Create an Account
-----------------

Create a new account and make it known to the world by registering an account name in the registry.

To be able to create an account, you have to own some `Ether` in the local account created by geth. Check local account balance:

`web3.fromWei(eth.getBalance(eth.coinbase), "ether")`

Copy and paste the following block into the geth interface to deploy your account code to the ethereum blockchain:

```
var MyTweetAccount = web3.eth.contract([{"constant":true,"inputs":[],"name":"getOwnerAddress","outputs":[{"name":"adminAddress","type":"address"}],"type":"function"},{"constant":false,"inputs":[],"name":"adminDeleteAccount","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"receiver","type":"address"}],"name":"adminRetrieveDonations","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"getLatestTweet","outputs":[{"name":"tweetString","type":"string"},{"name":"timestamp","type":"uint256"},{"name":"numberOfTweets","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"isAdmin","outputs":[{"name":"isAdmin","type":"bool"}],"type":"function"},{"constant":true,"inputs":[{"name":"tweetId","type":"uint256"}],"name":"getTweet","outputs":[{"name":"tweetString","type":"string"},{"name":"timestamp","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"getNumberOfTweets","outputs":[{"name":"numberOfTweets","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[{"name":"tweetString","type":"string"}],"name":"tweet","outputs":[{"name":"result","type":"int256"}],"type":"function"},{"inputs":[],"type":"constructor"}]).new( { from: web3.eth.accounts[0], data: '6060604052600060015560028054600160a060020a031916331790556104f4806100296000396000f36060604052361561006c5760e060020a60003504630c4f65bd811461006e5780633e450fff146100815780635c3e426c1461008c578063ae978f081461009a578063b6db75a014610118578063c3ad5ecb14610134578063ca7dc5b1146101b0578063fb46d4c5146101bb575b005b61020f600254600160a060020a03165b90565b61006c6104df61011c565b61006c6004356104b361011c565b604080516020818101835260008083526001805460001990810183528284528551868420830180546002948116156101000290930190921692909204601f810185900485028301850190965285825261022c95929384939083018282801561048b5780601f106104605761010080835404028352916020019161048b565b6102a85b600254600160a060020a03908116339091161461007e565b6040805160208181018352600080835260043580825281835284518583206001908101805460029281161561010002600019011691909104601f81018690048602830186019097528682526102ba96929594919290918301828280156104445780601f1061041957610100808354040283529160200191610444565b6102a860015461007e565b6102a86004808035906020019082018035906020019191908080601f01602080910402602001604051908101604052809392919081815260200183838082843750949650505050505050600061032f61011c565b60408051600160a060020a03929092168252519081900360200190f35b60405180806020018481526020018381526020018281038252858181518152602001915080519060200190808383829060006004602084601f0104600302600f01f150905090810190601f1680156102985780820380516001836020036101000a031916815260200191505b5094505050505060405180910390f35b60408051918252519081900360200190f35b60405180806020018381526020018281038252848181518152602001915080519060200190808383829060006004602084601f0104600302600f01f150905090810190601f1680156103205780820380516001836020036101000a031916815260200191505b50935050505060405180910390f35b151561033e57506000196103e0565b60a08251111561035157506001196103e0565b6001805460009081526020818152604080832042905583548352822085519084018054818552938390209094600290851615610100026000190190941693909304601f90810183900484019391928701908390106103e557805160ff19168380011785555b506103d29291505b8082111561041557600081556001016103be565b505060018054810190555060005b919050565b828001600101855582156103b6579182015b828111156103b65782518260005055916020019190600101906103f7565b5090565b820191906000526020600020905b81548152906001019060200180831161042757829003601f168201915b5050506000958652505060208490526040909320549293915050565b820191906000526020600020905b81548152906001019060200180831161046e57829003601f168201915b5050600154600019810160009081526020819052604090205494989497509550929350505050565b156104dc57604051600160a060020a03828116916000913016319082818181858883f150505050505b50565b156104f257600254600160a060020a0316ff5b56', gas: 3000000 }, function(e, contract){ if (typeof contract.address != 'undefined') { console.log(e, contract); console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash); } })
```

If you are curious how this ethereum byte code was created, have a look at the `deploy` directory in this repository. Also, have a look at the `TweetAccount.sol` source file, it contains a lot of comments to explain what the code does.

After some time, you should see a message like:

`Contract mined! address: 0x9e82d1745c6c9c04a6cfcde102837cf0f25efc56 transactionHash: 0xd458166ead4d6d398fd0c76616d57093798e86716dd4169d2846295223768f1f`

Congratulations! You just wrote your first code to the blockchain and successfully created your account!

You can use the `adminRetrieveDonations()` function to withdraw donations your account received, see `Solidity API` section below.

Section `Register Account Name` explains how you can assign a name to this account address so others can find your account by name.


Post a new Tweet
----------------

This example tweets `hello world` with the `MyTweetAccount` created above:

`MyTweetAccount.tweet.sendTransaction("hello world", {from: eth.coinbase, gas: 200000})`

Note that you have to own `Ether` to be able to tweet. See previous example how to check your account balance.

You should see a message like `I1210 13:33:35.411646   58618 xeth.go:1028] Tx(0x8b253799a87efd08133e4f2b7dcece785a05d6de075c92435da48cb61009ac7e) to: 0x9e82d1745c6c9c04a6cfcde102837cf0f25efc56` in the geth logs.

Check:

`MyTweetAccount.getLatestTweet()`

Should display `["hello world", 1449750863, 1]`. That means latest tweet is `hello world`, tweetet at unix timestamp `1449750863` with a total of `1` tweets for this account. Use a tool like [unixtimestamp.com](http://www.unixtimestamp.com) to convert timestamps.

More checks:

`MyTweetAccount.getNumberOfTweets()`

Should return `1`

`MyTweetAccount.getTweet(0)`

Should return `["hello world", 1449750863, 1]`

If you want to post another tweet at a later time, do the following:

 - Define a variable for your tweet account as described in section `Reading Tweets on the Command Line`.
 - Post a new tweet by creating a transaction with `tweet.sendTransaction` as descibed in this section.


Register Account Name
---------------------

To make your account known to the world, give it a name and register it in the account registry.

Then, others only have to remember your account name and do not need to write down the long and complicated account address.

Create a variable for the account registry. Copy and paste the following block into the geth interface:

```
var TweetRegistry = eth.contract([{"constant":false,"inputs":[{"name":"name","type":"string"}],"name":"adminUnregister","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"name","type":"string"},{"name":"accountAddress","type":"address"}],"name":"register","outputs":[{"name":"result","type":"int256"}],"type":"function"},{"constant":true,"inputs":[],"name":"getNumberOfAccounts","outputs":[{"name":"numberOfAccounts","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[],"name":"adminRetrieveDonations","outputs":[],"type":"function"},{"constant":true,"inputs":[{"name":"name","type":"string"}],"name":"getAddressOfName","outputs":[{"name":"addr","type":"address"}],"type":"function"},{"constant":false,"inputs":[],"name":"adminDeleteRegistry","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"accountAdmin","type":"address"}],"name":"adminSetAccountAdministrator","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"registrationDisabled","type":"bool"}],"name":"adminSetRegistrationDisabled","outputs":[],"type":"function"},{"constant":true,"inputs":[{"name":"addr","type":"address"}],"name":"getNameOfAddress","outputs":[{"name":"name","type":"string"}],"type":"function"},{"constant":false,"inputs":[],"name":"unregister","outputs":[{"name":"unregisteredAccountName","type":"string"}],"type":"function"},{"constant":true,"inputs":[{"name":"id","type":"uint256"}],"name":"getAddressOfId","outputs":[{"name":"addr","type":"address"}],"type":"function"},{"inputs":[],"type":"constructor"}]).at("0xe0f278b72097e563b09d7dc94c6f75aff5e83298"); TweetRegistry
```

Register account name `test` for the account `MyTweetAccount` (from the previous example) into the `TweetRegistry`. Please note you have to use a different account name than "test" since it is already taken.

`TweetRegistry.register.sendTransaction("test", MyTweetAccount.address, {from: eth.coinbase, gas: 200000})`


Browse Accounts
---------------

Access accounts by name without having to use the account address directly. You can also look up all existing accounts.

Use the `TweetRegistry` variable created in the previous section to look up accounts. Once you know the address of the account you want to read, use instructions in section `Read Tweets` to continue.

Get address of account called `test`: `TweetRegistry.getAddressOfName("test")`

Get total amount of accounts registered: `TweetRegistry.getNumberOfAccounts()`

Get address of the first account registered ever: `TweetRegistry.getAddressOfId(0)`. Change ID to iterate over all accounts.

Get name of account address: `TweetRegistry.getNameOfAddress("0x36b47d7c8fef8daf5d0b4477dcc8def158d4255f")`


Solidity API
------------

This decentralized app is written in the `Solidity` programming language. Documentation is available at [solidity.readthedocs.org](http://solidity.readthedocs.org).

Have a look at the `README.md` in the `deploy` directory of this repository. It explains how compilation from `Solidity` source code to the Ethereum byte code was done.

The `TweetAccount.sol` source file contains a lot of comments to explain what the code does.

```
contract TweetAccount{
 function TweetAccount()
 function getOwnerAddress()constant returns(address adminAddress)
 function adminDeleteAccount()
 function adminRetrieveDonations(address receiver)
 function getLatestTweet()constant returns(string tweetString,uint256 timestamp,uint256 numberOfTweets)
 function isAdmin()constant returns(bool isAdmin)
 function getTweet(uint256 tweetId)constant returns(string tweetString,uint256 timestamp)
 function getNumberOfTweets()constant returns(uint256 numberOfTweets)
 function tweet(string tweetString)constant returns(int256 result)
}

contract TweetRegistry{
 function TweetRegistry()
 function adminUnregister(string name)
 function register(string name,address accountAddress)returns(int256 result)
 function getNumberOfAccounts()constant returns(uint256 numberOfAccounts)
 function adminRetrieveDonations()
 function getAddressOfName(string name)constant returns(address addr)
 function adminDeleteRegistry()
 function adminSetAccountAdministrator(address accountAdmin)
 function adminSetRegistrationDisabled(bool registrationDisabled)
 function getNameOfAddress(address addr)constant returns(string name)
 function unregister()returns(string unregisteredAccountName)
 function getAddressOfId(uint256 id)constant returns(address addr)
}
```


Web3 Javascript API
-------------------

Geth uses javascript in its interactive interface. Documentation is available [here](https://github.com/ethereum/wiki/wiki/JavaScript-API).

The javascript code used in the examples above was created automatically on deploy. See the `README.md` in the `deploy` directory for more information

The files `deploy/tweet-account.deploy/interface.txt` and `deploy/tweet-registry.deploy/interface.txt` contain the actual javascript interface.


More Geth Commands
------------------

Get your account address (called coinbase):

`eth.coinbase`

You should see an ethereum account address starting with `0x`.

Get number of pending transactions:

`eth.getBlockTransactionCount("pending")`


Contributors
------------

 - digitaldonkey - [Web Browser User Interface](https://github.com/digitaldonkey/ethTweetUi)

Links
-----

 - https://news.ycombinator.com/item?id=10711843
 - https://www.reddit.com/r/ethereum/comments/3w8za8/decentralised_twitter_microblogging_on_the/
 - http://korben.info/un-clone-de-twitter-qui-utilise-la-blockchain.html
 - http://www.btc-echo.de/rise-of-the-dapps-sieben-dezentralisierte-apps-auf-ethereum-blockchain_2016022702
 - http://www.coindesk.com/7-cool-decentralized-apps-built-ethereum


License
-------

[GPL v3](http://choosealicense.com/licenses/gpl-3.0/)

```
Copyright (C) 2015-2016 Jahn Bertsch

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation in version 3.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
```
