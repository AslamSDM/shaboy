use starknet::ContractAddress;

#[starknet::interface]
pub trait IShaboyRegistry<TContractState> {
    fn add_subscription(
        ref self: TContractState, user: ContractAddress
    );
    fn get_subscription(self: @TContractState, address: ContractAddress) -> bool;
}

#[starknet::contract]
mod ShaboySubscription {
    use starknet::{ContractAddress, get_caller_address, storage_access::StorageBaseAddress};

    #[storage]
    struct Storage {
        ShaboyPlusUsers: LegacyMap::<ContractAddress, bool>
    }

    #[abi(embed_v0)]
    impl ShaboySubscription of super::IShaboyRegistry<ContractState> {
        fn add_subscription(ref self: ContractState, user:ContractAddress) {
            self._store_name(user);

        }

        fn get_subscription(self: @ContractState, address: ContractAddress) -> bool {
            self.ShaboyPlusUsers.read(address)
        }
    }

    #[generate_trait]
    impl InternalFunctions of InternalFunctionsTrait {
        fn _store_name(
            ref self: ContractState,
            user: ContractAddress,
        ) {
            self.ShaboyPlusUsers.write(user,true);

        }
    }


}