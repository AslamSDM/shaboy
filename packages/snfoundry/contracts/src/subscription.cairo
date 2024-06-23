use starknet::{ContractAddress,get_contract_address};

#[starknet::interface]
pub trait IShaboyRegistry<TContractState> {
    fn add_subscription(
        ref self: TContractState, user: ContractAddress
    );
    fn get_subscription(self: @TContractState, address: ContractAddress) -> bool;
}


#[starknet::interface]
trait IERC20<TState> {
    fn balance_of(self: @TState, account: ContractAddress) -> u256;
    fn transfer_from(
        ref self: TState, sender: ContractAddress, recipient: ContractAddress, amount: u256
    ) -> bool;
}



#[starknet::contract]
mod ShaboySubscription {
    use starknet::{ContractAddress, storage_access::StorageBaseAddress};
    use super::{IERC20, IERC20Dispatcher, IERC20DispatcherTrait};
    use starknet::{get_caller_address, get_contract_address};
    #[storage]
    struct Storage {
        ShaboyPlusUsers: LegacyMap::<ContractAddress, bool>,
        erc20_token_contract:ContractAddress,
        amount:u256
    }

    #[abi(embed_v0)]
    impl ShaboySubscription of super::IShaboyRegistry<ContractState> {
        fn add_subscription(ref self: ContractState, user:ContractAddress) {
            let caller_current_balance=self._check_erc20_balance(user);
            assert(caller_current_balance >= self.amount.read(), 'INSUFFICIENT_ERC20_BALANCE');
            self._store_name(user);
            self
                ._do_erc20_transfer(user
                );

        }

        fn get_subscription(self: @ContractState, address: ContractAddress) -> bool {
            self.ShaboyPlusUsers.read(address)
        }
    }
    #[constructor]
    fn constructor(
        ref self: ContractState,
        erc20_token_contract: ContractAddress
    ) {
        self.erc20_token_contract.write(erc20_token_contract);
        self.amount.write(1000000000000000);
    }

    #[generate_trait]
    impl InternalFunctions of InternalFunctionsTrait {
        fn _store_name(
            ref self: ContractState,
            user: ContractAddress,
        ) {
            self.ShaboyPlusUsers.write(user,true);

        }
        fn _check_erc20_balance(
            ref self: ContractState,
            user_address: ContractAddress
        ) -> u256 {
            let current_balance: u256 = IERC20Dispatcher {
                contract_address: self.erc20_token_contract.read()
            }
                .balance_of(user_address);
            current_balance
        }
        fn _do_erc20_transfer(
            ref self: ContractState,
            from: ContractAddress,
        ) {
            let amount_u256: u256 = self.amount.read().into();
             IERC20Dispatcher { contract_address: self.erc20_token_contract.read() }
                .transfer_from(from, get_contract_address(), amount_u256);
            
        }
    }

    }

