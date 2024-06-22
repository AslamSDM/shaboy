use starknet::ContractAddress;
use starknet::syscalls::{deploy_syscall};
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
    extern fn deploy_syscall(
        class_hash: ClassHash,
        contract_address_salt: felt252,
        calldata: Span<felt252>,
        deploy_from_zero: bool,
    ) -> SyscallResult<(ContractAddress, Span::<felt252>)> implicits(GasBuiltin, System) nopanic;
    #[external(v0)]
    fn deploy_new_contract(
        ref self: ContractState, recipient: ContractAddress, num: felt252,class_hash:ClassHash,
    ) -> ContractAddress {
        let salt=12;
        let address:felt252 = recipient.into();
        let calldata =array![address,num];
        let total_deployed = self.total_deployed.read();
        let deployed_address = deploy_syscall(class_hash,salt,calldata.span(),false);

        self.deployed_contracts.write(total_deployed, deployed_address);
        self.total_deployed.write(total_deployed + 1);
        deployed_address
    }

    #[external(v0)]
    fn get_deployed_contract(self: @ContractState, index: u128) -> ContractAddress {
        self.deployed_contracts.read(index)
    }
}
