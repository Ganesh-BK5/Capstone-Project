var ContractABI = [
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "originalClaim",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "timeInMinutes",
                "type": "uint256"
            }
        ],
        "name": "calculateDecreasedClaim",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "pure",
        "type": "function"
    }
];

var ContractAddress = '0x449924D1eA6844EfC0CE27478620122d3fb64fDF';
var loginbutton = document.getElementById('login');
var totalAmount = document.getElementById('amount');
var totalTime = document.getElementById('time');
var butt = document.getElementById('calculatebutt');
var answer = document.getElementById('ans');
var useraddress = document.getElementById('accountaddress');
var address,web3,myContract;


  


document.addEventListener('DOMContentLoaded', async() => {
    if (typeof window.ethereum != 'undefined') {
        console.log('Metamask is installed');

        web3 = new Web3(window.ethereum);
        console.log("web3 is loaded", web3);

        myContract = new web3.eth.Contract(ContractABI, ContractAddress);
        console.log("contract is loaded", myContract);

        loginbutton.addEventListener('click', async() => {
            var accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            address = accounts[0];
            useraddress.innerText = address;

            useraddress.classList.remove('d-none');
            loginbutton.classList.add('d-none');
            console.log(accounts);
            console.log(accounts[0]);
        });

        ethereum.on('accountsChanged', async function(accounts) {
            try {
                const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
                address = accounts[0];
                useraddress.innerText = address;
            } catch (error) {
                console.error("Error getting accounts:", error);
            }
        });

        

        butt.addEventListener('click', async () => {
            try {
                const originalClaim = totalAmount.value; // Get value from input
                const timeInMinutes = totalTime.value; // Get value from input
                
                console.log("Original Claim:", originalClaim);
                console.log("Time in Minutes:", timeInMinutes);
        
                if (!address) {
                    alert("Please login first.");
                    return;
                }
        
                // Validate inputs
                if (!originalClaim || !timeInMinutes || isNaN(originalClaim) || isNaN(timeInMinutes)) {
                    alert("Please enter valid numbers for claim amount and time.");
                    return;
                }
        
                // Call the smart contract function
                const result = await myContract.methods.calculateDecreasedClaim(
                    originalClaim,
                    timeInMinutes
                ).call({ from: address });
        
                answer.innerText = `Final Claim Amount: Rs${result}`;
            } catch (error) {
                console.error("Error calling calculateDecreasedClaim:", error);
            }
        });
        
        
        // Import the functions you need from the SDKs you need
            
            // TODO: Add SDKs for Firebase products that you want to use
            // https://firebase.google.com/docs/web/setup#available-libraries

            // Your web app's Firebase configuration
            // For Firebase JS SDK v7.20.0 and later, measurementId is optional
            const firebaseConfig = {
            apiKey: "AIzaSyAVDALFBe9aqqoeQHin6J_FwhTaNxuaue8",
            authDomain: "capstone-17ff1.firebaseapp.com",
            databaseURL: "https://capstone-17ff1-default-rtdb.firebaseio.com",
            projectId: "capstone-17ff1",
            storageBucket: "capstone-17ff1.appspot.com",
            messagingSenderId: "480904389149",
            appId: "1:480904389149:web:128c3a846f1953fe775cf4",
            measurementId: "G-SBLCE24S2J"
            };

            

            firebase.initializeApp(firebaseConfig);
            const database = firebase.database();
    
            // Get elapsed time from Firebase
            document.getElementById('getDataBtn').addEventListener('click', function () {
                const dbRef = database.ref('Sensor'); // Reference to the "Sensor" node
                dbRef.once('value')
                    .then((snapshot) => {
                        const elapsedTime = snapshot.val().ElapsedTime; // Get the ElapsedTime
                        document.getElementById('time').value = elapsedTime; // Set the value of the time input field
                    })
                    .catch((error) => {
                        console.error('Error fetching data: ', error);
                    });
            });
    


    } else {
        alert('Please install MetaMask');
    }
});
