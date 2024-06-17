// udctrial.cairo

#[starknet::contract]
mod Account {
  ...
  use starknet::call_contract_syscall;

  #[generate_trait]
  impl PrivateImpl of PrivateTrait {
    ...
    fn execute_single_call(self: @ContractState, call: Call) -> Span<felt252> {
      let Call{to, selector, calldata} = call;
      call_contract_syscall(to, selector, calldata.span()).unwrap_syscall()
    }
  }
}
