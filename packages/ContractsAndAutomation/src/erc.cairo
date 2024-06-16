use starknet::ContractAddress;
#[starknet::interface]
pub trait INFT<TContractState>{
    fn mint(ref self:TContractState,
    recipient:ContractAddress,
    token_ids:Span<u256>,
    values:Span<u256>
);
fn get_next_tokenID(self:@TContractState)->u256;
    
} 
#[starknet::contract]
mod MyERC1155 {
    use openzeppelin::introspection::src5::SRC5Component;
    use openzeppelin::token::erc1155::{ERC1155Component, ERC1155HooksEmptyImpl};
    use starknet::ContractAddress;

    component!(path: ERC1155Component, storage: erc1155, event: ERC1155Event);
    component!(path: SRC5Component, storage: src5, event: SRC5Event);

    // ERC1155 Mixin
    #[abi(embed_v0)]
    impl ERC1155MixinImpl = ERC1155Component::ERC1155MixinImpl<ContractState>;
    impl ERC1155InternalImpl = ERC1155Component::InternalImpl<ContractState>;

    #[storage]
    struct Storage {
        nextTokenid:u256,
        #[substorage(v0)]
        erc1155: ERC1155Component::Storage,
        #[substorage(v0)]
        src5: SRC5Component::Storage
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        #[flat]
        ERC1155Event: ERC1155Component::Event,
        #[flat]
        SRC5Event: SRC5Component::Event
    }

    #[constructor]
    fn constructor(
        ref self: ContractState
    ) {
        let base_uri = "https://api.example.com/v1/";
        self.erc1155.initializer(base_uri);
       
    }
    #[abi(embed_v0)]
    impl MyERC1155 of super:: INFT<ContractState>{
        fn mint(ref self:ContractState,
        recipient:ContractAddress,
    token_ids:Span<u256>,
    values:Span<u256>){
        self.mint_uri(recipient,token_ids,values);
    }
    fn get_next_tokenID(self:@ContractState)->u256{
        self.nextTokenid.read() +1
    }


    }


    #[generate_trait]
    impl InternalImpl of InternalTrait {
        fn mint_uri(
            ref self: ContractState,
            recipient: ContractAddress,
            token_ids: Span<u256>,
            values:Span<u256>
        ) {
            let tokens:u256=self.nextTokenid.read();
            let len:u256=(token_ids.len().into());
            self.erc1155.batch_mint_with_acceptance_check(recipient, token_ids, values, array![].span());
           self.nextTokenid.write(tokens+ len);  
        }
        fn _get_next_tokenID(self:ContractState)->u256{
            self.nextTokenid.read() +1
        }
    }
}