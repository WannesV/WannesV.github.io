// globals
const dappInterface = [{
	"constant":true,
	"inputs":[
		{"name":"plate", "type":"string"},
		{"name":"index","type":"uint256"}
		],
	"name":"checkHistory",
	"outputs":[
		{"name":"lplate","type":"string"},
		{"name":"blockn","type":"uint256"},
		{"name":"paid","type":"uint256"},
		{"name":"reg","type":"string"}],
	"payable":false,
	"stateMutability":"view",
	"type":"function"
},{
	"constant":false,
	"inputs":[
		{"name":"plate","type":"string"},
		{"name":"regio","type":"string"}
		],
	"name":"park",
	"outputs":[],
	"payable":true,
	"stateMutability":"payable",
	"type":"function"
},{
	"constant":true,
	"inputs":[
		{"name":"plate","type":"string"}
		],
	"name":"checkRecent",
	"outputs":[
		{"name":"lplate","type":"string"},
		{"name":"blockn","type":"uint256"},
		{"name":"paid","type":"uint256"},
		{"name":"reg","type":"string"}
		],
	"payable":false,
	"stateMutability":"view",
	"type":"function"
},{
	"inputs":[],
	"payable":false,
	"stateMutability":"nonpayable",
	"type":"constructor"
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
    init: function() {
        this.parkContract = web3.eth.contract(dappInterface);
        this.contractInstance = this.parkContract.at(contractAddress);
        
        console.log(this.parkContract);
        console.log(this.contractInstance);
        console.log(web3.eth.defaultAccount);
        //parkInit();
    },
    
    parkInit: function() {
        let licensePlate = document.getElementById('plate').value;
        let e = document.getElementById('regio');
        let regio = e.options[e.selectedIndex].value;
        let ether = document.getElementById('ether').value;
    }
}