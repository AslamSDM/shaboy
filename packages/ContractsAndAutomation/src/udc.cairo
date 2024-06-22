use openzeppelin::utils::interfaces::{IUniversalDeployerDispatcher, IUniversalDeployerDispatcherTrait};
use starknet :: ContractAddress;
use starknet ::class_hash_const;
const UDC_ADDRESS: felt252 = 0x04a64cd09a853868621d94cae9952b106f2c36a3f81260f85de6696c6b050221;

fn deploy() -> ContractAddress {
    let dispatcher = IUniversalDeployerDispatcher {
        contract_address: UDC_ADDRESS.try_into().unwrap()
    };

    // Deployment parameters
    let class_hash = class_hash_const::<
       0x5c478ee27f2112411f86f207605b2e2c58cdb647bac0df27f660ef2252359c6
    >();
    let salt = 1234567879;
    let from_zero = false;
    let mut calldata = array![];

    // The UDC returns the deployed contract address
    dispatcher.deploy_contract(class_hash, salt, from_zero, calldata.span())
}