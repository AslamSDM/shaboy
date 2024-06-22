use starknet::ContractAddress;

#[starknet::interface]
pub trait IShaboyRegistry<TContractState> {
    fn add_minter(
        ref self: TContractState, supply: u256,minter:ContractAddress
    );
    fn get_minter(self: @TContractState, supply: u256) -> ContractAddress;
}

#[starknet::contract]
mod ShaboyGamesMinterRegistry {
    use starknet::{ContractAddress, get_caller_address, storage_access::StorageBaseAddress};

    #[storage]
    struct Storage {
        ShaboyGamesMinters: LegacyMap::<u256, ContractAddress>,
        getLatestTokenID:u256
    }

    #[abi(embed_v0)]
    impl ShaboyGamesMinterRegistry of super::IShaboyRegistry<ContractState> {
        fn add_minter(
            ref self: ContractState, supply: u256,minter:ContractAddress
        ){
            let mut count:u256 =0;
            loop{
                if count<supply{
                        self.ShaboyGamesMinters.write(self.getLatestTokenID.read(),minter);
                        self.getLatestTokenID.write(self.getLatestTokenID.read()+1);
                        count = count+1;
                }
                else{
                    break;
                }
            }
        }
        fn get_minter(self: @ContractState, supply: u256) -> ContractAddress{
            self.ShaboyGamesMinters.read(supply)
        }
    }

    #[constructor]
    fn constructor(ref self:ContractState){
        self.getLatestTokenID.write(1);
    }


}