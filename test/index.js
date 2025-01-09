const Web3 = require("web3").default;
const web3 = new Web3("http://127.0.0.1:7545"); // URL de Ganache

const contractABI = require("./contracts/VentaContract.json").abi;
const contractAddress = "0x5885580e93dBF28686Bf3ab6A806Bffff81a2408"; // Dirección del contrato en Ganache

// const erpContract = new web3.eth.Contract(contractABI, contractAddress);
const ventaContract = new web3.eth.Contract(contractABI, contractAddress);

const account = "0x4cAfEA0003cbe07A20C44070976Ee358204dbAd9"; // Cuenta de Ganache

// ventaContract.methods
//   .registrarVenta(2, 50, [1], [1])
//   .send({
//     from: account,
//     gas: 300000, // Aumenta el límite de gas aquí
//   })
//   .then((receipt) => {
//     console.log("Transaction successful:", receipt);
//   })
//   .catch((error) => {
//     console.error("Error sending transaction:", error);
//   });

// ventaContract.methods
//   .getVenta(1)
//   .call()
//   .then((result) => {
//     console.log("Data Entry:", result);
//   })
//   .catch((error) => {
//     console.error("Error fetching data:", error);
//   });

// Listar todas las ventas
(async () => {
  try {
    let ventasCount = await ventaContract.methods.ventaCount().call();
    console.log("Ventas Count:", ventasCount);
    for (let i = 1; i <= ventasCount; i++) {
      try {
        let result = await ventaContract.methods.getVenta(i).call();
        console.log("Venta Entry:", result);
        console.log("id venta", result[0]);
        console.log("id cliente", result[1]);
        console.log("total", result[2]);
        console.log("array id productos", result[3]);
        console.log("array cantidad productos", result[4]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  } catch (error) {
    console.error("Error fetching ventas count:", error);
  }
})();
