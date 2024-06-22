use starknet::SyscallResultTrait;
use starknet::{Store, SyscallResult,ContractAddress};
use starknet::storage_access::StorageBaseAddress;


impl ShaboyStore of Store<Array<ContractAddress>> {
    fn read(address_domain: u32, base: StorageBaseAddress) -> SyscallResult<Array<ContractAddress>> {
        ShaboyStore::read_at_offset(address_domain, base, 0)
    }

    fn write(
        address_domain: u32, base: StorageBaseAddress, value: Array<ContractAddress>
    ) -> SyscallResult<()> {
        ShaboyStore::write_at_offset(address_domain, base, 0, value)
    }

    fn read_at_offset(
        address_domain: u32, base: StorageBaseAddress, mut offset: u8
    ) -> SyscallResult<Array<ContractAddress>> {
        let mut arr: Array<ContractAddress> = array![];


        let len: u8 = Store::<u8>::read_at_offset(address_domain, base, offset)
            .expect('Storage Span too large');
        offset += 1;


        let exit = len + offset;
        loop {
            if offset >= exit {
                break;
            }

            let value = Store::<ContractAddress>::read_at_offset(address_domain, base, offset).unwrap();
            arr.append(value);
            offset += Store::<ContractAddress>::size();
        };


        Result::Ok(arr)
    }

    fn write_at_offset(
        address_domain: u32, base: StorageBaseAddress, mut offset: u8, mut value: Array<ContractAddress>
    ) -> SyscallResult<()> {

        let len: u8 = value.len().try_into().expect('Storage - Span too large');
        Store::<u8>::write_at_offset(address_domain, base, offset, len).unwrap();
        offset += 1;

        while let Option::Some(element) = value
            .pop_front() {
                Store::<ContractAddress>::write_at_offset(address_domain, base, offset, element).unwrap();
                offset += Store::<ContractAddress>::size();
            };

        Result::Ok(())
    }

    fn size() -> u8 {
        255 * Store::<ContractAddress>::size()
    }
}

#[starknet::interface]
pub trait IShaboyStorageContract<TContractState> {
    fn seterc20(ref self:TContractState,ownerAddress:ContractAddress,deployedContract:ContractAddress);
    fn seterc721(ref self:TContractState,ownerAddress:ContractAddress,deployedContract:ContractAddress);
    fn geterc20(self:@TContractState,walletForCheck:ContractAddress)->Array<ContractAddress>;
    fn geterc721(self:@TContractState,walletForCheck:ContractAddress)->Array<ContractAddress>;
    fn getallerc20s(self:@TContractState)->Array<ContractAddress>;
    fn getallerc721s(self:@TContractState)->Array<ContractAddress>;
}

#[starknet::contract]
pub mod ShaboyStorageContract {
    use super::ShaboyStore;
    use starknet::ContractAddress;

    #[storage]
    struct Storage {
        erc20s:LegacyMap::<ContractAddress,Array<ContractAddress>>,
        erc721s:LegacyMap::<ContractAddress,Array<ContractAddress>>,
        allerc20s:Array<ContractAddress>,
        allerc721s:Array<ContractAddress>
    }

    #[abi(embed_v0)]
    impl StoreArrayImpl of super::IShaboyStorageContract<ContractState> {
        fn seterc20(ref self:ContractState,ownerAddress:ContractAddress,deployedContract:ContractAddress){
            let mut deployedContracts:Array<ContractAddress> =self.erc20s.read(ownerAddress);
            deployedContracts.append(deployedContract);
            self.erc20s.write(ownerAddress,deployedContracts);
            let mut existing_all_erc20s:Array<ContractAddress> = self.allerc20s.read();
            existing_all_erc20s.append(deployedContract);
            self.allerc20s.write(existing_all_erc20s);

        }
        fn seterc721(ref self:ContractState,ownerAddress:ContractAddress,deployedContract:ContractAddress){
            let mut deployedContracts:Array<ContractAddress> =self.erc721s.read(ownerAddress);
            deployedContracts.append(deployedContract);
            self.erc721s.write(ownerAddress,deployedContracts); 
            let mut existing_all_erc721s:Array<ContractAddress> = self.allerc721s.read();
            existing_all_erc721s.append(deployedContract);
            self.allerc721s.write(existing_all_erc721s);
        }
        fn geterc20(self:@ContractState,walletForCheck:ContractAddress)->Array<ContractAddress>{
            self.erc20s.read(walletForCheck)

        }
        fn geterc721(self:@ContractState,walletForCheck:ContractAddress)->Array<ContractAddress>{
            self.erc721s.read(walletForCheck)
        }
        fn getallerc20s(self:@ContractState)->Array<ContractAddress>{
                self.allerc20s.read()
        }
        fn getallerc721s(self:@ContractState)->Array<ContractAddress>{
            self.allerc721s.read()

        }
        
    }
}


