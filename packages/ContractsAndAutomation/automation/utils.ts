export const toAddress=(address: string): `0x${string}` =>{
    return `0x${address.slice(2)}` as `0x${string}`;
  }