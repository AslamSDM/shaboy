// storageMain.cairo
use starknet::{ContractAddress};
#[starknet::interface]
trait ISimpleStorage<TContractState> {
    fn setErc20(ref self: TContractState, deployedContract: ContractAddress);
    fn setErc721(ref self: TContractState, deployedContract: ContractAddress);
    fn getErc20(self: @TContractState, walletAddress: ContractAddress) -> Span<ContractAddress>;
    fn getErc721(self: @TContractState, walletAddress: ContractAddress) -> Span<ContractAddress>;
}

#[starknet::contract]
mod ShaboyStorage {
    use core::array::ArrayTrait;
#[storage]
    struct Storage {
        erc20AddrToDeployment: LegacyMap::<ContractAddress,(u256,ContractAddress)>,
        erc20AddressCount:LegacyMap :: <ContractAddress,u256>,
        erc721AddrToDeployment: LegacyMap::<ContractAddress,(u256,ContractAddress)>,
        erc721AddressCount :LegacyMap :: <ContractAddress,u256>
    }
    use starknet::ContractAddress;

    use starknet::get_caller_address;
    #[abi(embed_v0)]
    impl ShaboyStorage of super::ISimpleStorage<ContractState> {
        fn setErc20(ref self: ContractState, deployedContract: ContractAddress) {
            let count = self.erc20AddressCount.read(get_caller_address());
            self.erc20AddrToDeployment.write(get_caller_address(),(count,deployedContract));
            self.erc20AddressCount.write(get_caller_address(),count+1);
        }
        fn setErc721(ref self: ContractState, deployedContract: ContractAddress) {
            let count = self.erc20AddressCount.read(get_caller_address());
            self.erc721AddrToDeployment.write(get_caller_address(),(count,deployedContract));
            self.erc721AddressCount.write(get_caller_address(),count+1);
        }
        // fn getErc20(self: @ContractState, walletAddress: ContractAddress) -> Span<ContractAddress> {
        //     let count = self.erc20AddressCount.read(walletAddress);
        //     let i:u256=0;
        //     let mut returnArray = ArrayTrait::<ContractAddress>::new();
        //     loop {
        //         if i<count{
        //             let deployedContracts = self.erc20AddrToDeployment.read(walletAddress);
        //             returnArray.append(deployedContracts.read(i));
        //         }
        //         else{
        //             break;
        //         }
        //     }
        //     returnArray.span()

        // }

        fn getErc20(self: @ContractState, walletAddress: ContractAddress) -> (u256,ContractAddress) {
            self.erc20AddrToDeployment.read(walletAddress)
        }
        // fn getErc721(
        //     self: @ContractState, walletAddress: ContractAddress
        // ) -> Span<ContractAddress> {
        //     self.erc721AddrToDeployment.read(walletAddress);
        // }

        fn getErc721(self: @ContractState, walletAddress: ContractAddress) -> Span<ContractAddress> {
            self.erc721AddrToDeployment.read(walletAddress)
        }
    }
}
