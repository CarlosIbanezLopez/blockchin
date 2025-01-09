import Web3 from "web3";
import { readFile } from "fs/promises";

const web3 = new Web3("http://127.0.0.1:7545"); // URL de Ganache
const contractABI = JSON.parse(
  await readFile(new URL("./contracts/VentaContract.json", import.meta.url))
).abi;
const contractAddress = "0x94A3ecb5e4b84B8a913311D18bA51dE82ca2B629"; // Dirección del contrato en Ganache

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

/**
 * 
 * @param {number} idCliente - Id del cliente
 * @param {string} total - Total de la venta
 * @param {number[]} idProductos - Array de id de productos
 * @param {number[]} cantidades - Array de cantidades de productos
 * @returns {Promise}
 */
function registrarVenta(idCliente, total, idProductos, cantidades) {
  return ventaContract.methods
    .registrarVenta(idCliente, total, idProductos, cantidades)
    .send({
      from: account,
      gas: 300000, // Aumenta el límite de gas aquí
    });
}

/**
 * Retrieves the details of a sale (venta) from the blockchain contract.
 *
 * @param {string} id - The unique identifier of the sale to retrieve.
 * @returns {Promise<Object>} A promise that resolves to the details of the sale.
 */
function getVenta(id) {
  return ventaContract.methods.getVenta(id).call();
}

// const venta = await registrarVenta(2, "49.99", [1], [1]);
// console.log("Transaction successful:", venta);

// Listar todas las ventas
function listarVentas() {
  return ventaContract.methods
    .ventaCount()
    .call()
    .then((ventasCount) => {
      const ventas = [];
      for (let i = 1; i <= ventasCount; i++) {
        ventas.push(ventaContract.methods.getVenta(i).call());
      }
      return Promise.all(ventas);
    });
}

const ventas = await listarVentas();
// Mostrar las ventas una por una
ventas.forEach((venta) => {
  console.log("---------------------------------------------");
  console.log(
    "id venta",
    venta[0],
    "\n---------------------------------------------"
  );
  console.log("id cliente", venta[1]);
  console.log("total", venta[2]);
  console.log("array id productos", venta[3]);
  console.log("array cantidad productos", venta[4]);
});
