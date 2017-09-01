// globals
const dappInterface = [{
    "constant": true,
    "inputs": [
        {"name": "plate", "type": "string"},
        {"name": "index", "type": "uint256"}
    ],
    "name": "checkHistory",
    "outputs": [
        {"name": "lplate", "type": "string"},
        {"name": "blockn", "type": "uint256"},
        {"name": "paid", "type": "uint256"},
        {"name": "reg", "type": "string"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": false,
    "inputs": [
        {"name": "plate", "type": "string"},
        {"name": "regio", "type": "string"}
    ],
    "name": "park",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
}, {
    "constant": true,
    "inputs": [
        {"name": "plate", "type": "string"}
    ],
    "name": "checkRecent",
    "outputs": [
        {"name": "lplate", "type": "string"},
        {"name": "blockn", "type": "uint256"},
        {"name": "paid", "type": "uint256"},
        {"name": "reg", "type": "string"}
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
}];
const contractAddress = "0xab0a0924993d0e024a0633c761a61179ff109aa6"

window.addEventListener('load', function () {

    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
        // Use Mist/MetaMask's provider
        window.web3 = new Web3(web3.currentProvider);

    } else {
        console.log('No web3? You should consider trying MetaMask!');
        // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    }

    // Now you can start your app & access web3 freely:
    contractEvents.init();
});

const contractEvents = {
    init: function () {
        this.parkContract = web3.eth.contract(dappInterface);
        this.contractInstance = this.parkContract.at(contractAddress);

        console.log(this.parkContract);
        console.log(this.contractInstance);
        console.log(web3.eth.accounts);
        web3.eth.defaultAccount = "0x4219473B52c3D8946057Ed7Ceec851B78d319D74";
        console.log(web3.eth.defaultAccount);
        web3.eth.getBalance("0x4219473B52c3D8946057Ed7Ceec851B78d319D74", function (error, value) {
            console.log(error, value);
        });
        this.submitInit();
        this.submit2Init();
        this.plateChangedInit();
    },

    submitInit: function () {
        $('#submitBtn').on('click', function (event) {
            let plate = document.getElementById('plateEnc').value;
            let e = document.getElementById('regio');
            let regio = e.options[e.selectedIndex].value;
            let wei = document.getElementById('wei').value;
            contractEvents.contractInstance.park(plate, regio, {value: wei, gas: 2000}, function (error, transaction) {
                console.log(error, transaction);
                if(error) {
                    $('.submitResult').html(`<p>Something went wrong.</p>`)
                        .removeClass("red")
                        .removeClass("green")
                        .addClass("red");
                }
                else {
                    $('.submitResult').html(`<p><a href="https://rinkeby.etherscan.io/tx/${transaction}" target="_blank">Your transaction</a> has been sent</p>`)
                        .removeClass("red")
                        .removeClass("green")
                        .addClass("green");
                }
            });
        });
    },

    submit2Init: function () {
        $('#submitBtn2').on('click', function (event) {
            let plate = document.getElementById('plateCheck').value;

            var test = contractEvents.contractInstance.checkRecent(plate, function (error, value) {
                console.log(value);
            });
            console.log(test);
        });
    },

    plateChangedInit: function () {
        $('#plate').on('focusout', function (event) {
            console.log("test");
            // Create the encryption object and set the key.
            var crypt = new JSEncrypt();
            crypt.setKey("MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDHOGTKyEAAiNMuWe2niVKKCvXu\n" +
                "qHn/CL+GlGnFbQE5DpKIgyp+b/UYDL5OnNP9BigK6G80KwNsptk0OuWobN6DhBZy\n" +
                "qOL4mT6T62vb3o4OpdrYA+z1nGsXsnuLW0UW1N5dLgNzhq9+XeOUP+DYp5msG8s4\n" +
                "EgXYf5U1LqEK/Xy4AQIDAQAB");
            //Eventhough the methods are called setPublicKey and setPrivateKey, remember
            //that they are only alias to setKey, so you can pass them both a private or
            //a public openssl key, just remember that setting a public key allows you to only encrypt.

            var text = document.getElementById('plate').value;
            // Encrypt the data with the public key.
            var enc = crypt.encrypt(text);
            $('#plateEnc').val(enc);

        });
    },

}