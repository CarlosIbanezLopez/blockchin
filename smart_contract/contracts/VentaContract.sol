// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract VentaContract {
    struct Venta {
        uint id;
        uint cliente;
        string total;
        uint[] productoIds;
        uint[] cantidades;
    }

    mapping(uint => Venta) public ventas;
    uint public ventaCount;

    function registrarVenta(
        uint _cliente,
        string memory _total,
        uint[] memory _productoIds,
        uint[] memory _cantidades
    ) public {
        ventaCount++;
        ventas[ventaCount] = Venta(ventaCount, _cliente, _total, _productoIds, _cantidades);
    }

    function getVenta(uint _id) public view returns (
        uint,
        uint,
        string memory,
        uint[] memory,
        uint[] memory
    ) {
        Venta memory venta = ventas[_id];
        return (venta.id, venta.cliente, venta.total, venta.productoIds, venta.cantidades);
    }
}
