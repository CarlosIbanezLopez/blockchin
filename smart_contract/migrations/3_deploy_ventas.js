const VentaContract = artifacts.require("VentaContract");

module.exports = function (deployer) {
    deployer.deploy(VentaContract);
};