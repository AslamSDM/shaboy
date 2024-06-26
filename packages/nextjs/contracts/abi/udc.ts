const udcabi={"abi":[
    {
      "data": [
        {
          "name": "address",
          "type": "felt"
        },
        {
          "name": "deployer",
          "type": "felt"
        },
        {
          "name": "unique",
          "type": "felt"
        },
        {
          "name": "classHash",
          "type": "felt"
        },
        {
          "name": "calldata_len",
          "type": "felt"
        },
        {
          "name": "calldata",
          "type": "felt*"
        },
        {
          "name": "salt",
          "type": "felt"
        }
      ],
      "keys": [],
      "name": "ContractDeployed",
      "type": "event"
    },
    {
      "inputs": [
        {
          "name": "classHash",
          "type": "felt"
        },
        {
          "name": "salt",
          "type": "felt"
        },
        {
          "name": "unique",
          "type": "felt"
        },
        {
          "name": "calldata_len",
          "type": "felt"
        },
        {
          "name": "calldata",
          "type": "felt*"
        }
      ],
      "name": "deployContract",
      "outputs": [
        {
          "name": "address",
          "type": "felt"
        }
      ],
      "type": "function"
    }
  ]
}
export default udcabi;