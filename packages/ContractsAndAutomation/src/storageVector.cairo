// storageVector.cairo

// storageMain.cairo
use starknet::{ContractAddress};
#[starknet::interface]
trait IShaboyStorage<TContractState> {
    fn setErc20(ref self: TContractState, deployedContract: ContractAddress);
    fn setErc721(ref self: TContractState, deployedContract: ContractAddress);
    fn getErc20(self: @TContractState, walletAddress: ContractAddress) -> Array<ContractAddress>;
    fn getErc721(self: @TContractState, walletAddress: ContractAddress) -> Array<ContractAddress>;
}

#[starknet::contract]
mod ShaboyStorage {
    use core::array::ArrayTrait;
    use starknet::{ContractAddress};
#[storage]
    struct Storage {
        erc20AddrToDeployment: LegacyMap::<ContractAddress,Array<ContractAddress>>,
        erc721AddrToDeployment: LegacyMap::<ContractAddress,Array<ContractAddress>>
        
    }
    use starknet::get_caller_address;
    #[abi(embed_v0)]
    impl ShaboyStorage of super::IShaboyStorage<ContractState> {
        fn setErc20(ref self: ContractState, deployedContract: ContractAddress) {
            let mut count:Array<ContractAddress> = self.erc20AddrToDeployment.read(get_caller_address());
            count.append(deployedContract);
            self.erc20AddrToDeployment.write(get_caller_address(),count);
        }

        fn setErc721(ref self: ContractState, deployedContract: ContractAddress) {
            let mut count:Array<ContractAddress> = self.erc721AddrToDeployment.read(get_caller_address());
            count.append(deployedContract);
            self.erc721AddrToDeployment.write(get_caller_address(),count);
        }


        fn getErc20(self: @ContractState, walletAddress: ContractAddress) -> Array<ContractAddress> {
            self.erc20AddrToDeployment.read(walletAddress)
        }

        fn getErc721(self: @ContractState, walletAddress: ContractAddress) -> Array<ContractAddress> {
            self.erc721AddrToDeployment.read(walletAddress)
        }
    }
}
