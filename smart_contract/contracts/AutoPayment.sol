// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract AutoPayment {
    
    address public owner;  // El dueño del contrato (por ejemplo, el ERP)
    address public supplier;  // Dirección del proveedor
    uint256 public paymentAmount;  // Monto del pago

    bool public orderFulfilled;  // Estado del pedido (se cumple si el proveedor entrega)

    event PaymentSent(address supplier, uint256 amount);

    constructor(address _supplier, uint256 _paymentAmount) {
        owner = msg.sender;  // El dueño del contrato es quien lo despliega (el ERP)
        supplier = _supplier;  // Dirección del proveedor
        paymentAmount = _paymentAmount;  // Monto acordado para el pago
        orderFulfilled = false;  // El pedido aún no se cumple
    }

    // Función que marca la orden como cumplida (solo el dueño puede llamarla)
    function fulfillOrder() public {
        require(msg.sender == owner, "Solo el ERP puede marcar la orden como cumplida.");
        orderFulfilled = true;
        executePayment();  // Ejecuta el pago automáticamente si la orden se cumple
    }

    // Función que permite al ERP enviar fondos al contrato
    function deposit() public payable {
        require(msg.sender == owner, "Solo el ERP puede depositar fondos.");
        require(msg.value == paymentAmount, "La cantidad enviada debe ser igual al monto del pago.");
    }

    // Función interna que ejecuta el pago al proveedor
    function executePayment() internal {
        require(orderFulfilled == true, "El pedido no ha sido cumplido.");
        require(address(this).balance >= paymentAmount, "Fondos insuficientes en el contrato.");

        payable(supplier).transfer(paymentAmount);  // Transfiere el monto al proveedor
        emit PaymentSent(supplier, paymentAmount);  // Emite el evento del pago
    }

    // Función para que el proveedor verifique el balance del contrato
    function checkBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
