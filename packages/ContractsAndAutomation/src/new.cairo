use starknet::ContractAddress;
#[starknet::interface]
pub trait INFT<TContractState> {
    fn mint(ref self: TContractState, recipient: ContractAddress, token_id: u256);
    fn get_next_tokenID(self: @TContractState) -> u256;
    fn mint_multi(ref self: TContractState, recipient: ContractAddress, num: u256);
}
#[starknet::contract]
mod ShaboyGames {
    use starknet::ContractAddress;
    use starknet::get_caller_address;

    use openzeppelin::introspection::src5::SRC5Component;
    use openzeppelin::token::erc721::{ERC721Component, ERC721HooksEmptyImpl};


    component!(path: ERC721Component, storage: erc721, event: ERC721Event);
    component!(path: SRC5Component, storage: src5, event: SRC5Event);

    // ERC721 Mixin
    #[abi(embed_v0)]
    impl ERC721MixinImpl = ERC721Component::ERC721MixinImpl<ContractState>;
    impl ERC721InternalImpl = ERC721Component::InternalImpl<ContractState>;

    #[storage]
    struct Storage {
        nextTokenid: u256,
        owner:ContractAddress,
        #[substorage(v0)]
        erc721: ERC721Component::Storage,
        #[substorage(v0)]
        src5: SRC5Component::Storage
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        #[flat]
        ERC721Event: ERC721Component::Event,
        #[flat]
        SRC5Event: SRC5Component::Event
    }

    #[constructor]
    fn constructor(
        ref self: ContractState, name: ByteArray, symbol: ByteArray, base_uri: ByteArray,recipient:ContractAddress,num:u256
    ) {
        self.owner.write(get_caller_address());
        self.erc721.initializer(name, symbol, base_uri);
        if num==1 {
            self.mint(recipient, num);
        }
        else{
            self.mint_multi(recipient, num);
        }
    }

    #[abi(embed_v0)]
    impl ShaboyGames of super::INFT<ContractState> {
        fn mint(ref self: ContractState, recipient: ContractAddress, token_id: u256) {
            self.mint_uri(recipient, token_id);
        }
        fn get_next_tokenID(self: @ContractState) -> u256 {
            self.nextTokenid.read() + 1
        }
        fn mint_multi(ref self: ContractState, recipient: ContractAddress, num: u256) {
            self._min_multi(recipient, num);
        }
    }
    #[generate_trait]
    impl InternalImpl of InternalTrait {
        fn mint_uri(ref self: ContractState, recipient: ContractAddress, token_id: u256) {
            let tokens: u256 = self.nextTokenid.read();
            self.erc721._mint(recipient, token_id);
            self.nextTokenid.write(tokens + 1);
        }
        fn _get_next_tokenID(self: ContractState) -> u256 {
            self.nextTokenid.read() + 1
        }
        fn _min_multi(ref self: ContractState, recipient: ContractAddress, num: u256) {
            let mut counter: u256 = 0;
            loop {
                if counter >= num {
                    break;
                }
                let token_id = self.nextTokenid.read() + 1;
                self.mint_uri(recipient, token_id);
                counter = counter + 1;
            }
        }
    }
}
