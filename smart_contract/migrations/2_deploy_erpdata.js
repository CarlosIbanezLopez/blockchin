const ERPData = artifacts.require("ERPData");

module.exports = function (deployer) {
  deployer.deploy(ERPData);
};
