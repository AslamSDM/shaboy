use starknet::{ContractAddress,ClassHash};

#[starknet::interface]
trait IUniversalDeployer<TContractState> {
    fn deployContract(
        ref self: TContractState,
        class_hash: ClassHash,
        salt: felt252,
        unique: bool,
        calldata: Span<felt252>
    ) -> ContractAddress; }

#[starknet::contract]
mod FactoryContract {
    use starknet::{ContractAddress,ClassHash,SyscallResult};

    #[storage]
    struct Storage {
        deployed_contracts: LegacyMap::<u128, ContractAddress>,
        total_deployed: u128,
    }

    #[constructor]
    fn constructor(ref self: ContractState) {
        self.total_deployed.write(0);
    }
    #[external(v0)]
    fn deploy_new_contract(
        ref self: ContractState, recipient: ContractAddress, num: felt252,class_hash:ClassHash
    ) -> ContractAddress {
        let salt=12;
        let address:felt252 = recipient.into();
        let calldata =array![address,num];
        let total_deployed = self.total_deployed.read();
        let dispatcher = super :: IUniversalDeployerDispatcher {
            const UDC_ADDRESS: ContractAddress = 0x041a78e741e5af2fec34b695679bc6891742439f7afb8484ecd7766661ad02bf;
            contract_address: UDC_ADDRESS.try_into().unwrap()
        };
        let deployed_address=dispatcher.deployContract(class_hash, salt, unique, calldata.span());
        self.deployed_contracts.write(total_deployed, deployed_address);
        self.total_deployed.write(total_deployed + 1);
        deployed_address

        #[abi(embed_v0)]
        impl FactoryContract of super:: IUniversalDeployer<ContractState>{

        }
    }

    #[external(v0)]
    fn get_deployed_contract(self: @ContractState, index: u128) -> ContractAddress {
        self.deployed_contracts.read(index)
    }
    #[generate_trait]
    impl InternalImpl of InternalTrait {
        fn _deployContract(ref self: ContractState, recipient: ContractAddress, num: felt252,class_hash:ClassHash)->ContractAddress{

        }
    }
}
