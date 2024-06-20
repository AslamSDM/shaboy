
import type { NextPage } from "next";
import { useDeployedContractInfo} from "~~/hooks/scaffold-stark";
import { useScaffoldMultiWriteContract } from "~~/hooks/scaffold-stark/useScaffoldMultiWriteContract";
const Home: NextPage = () => {
  const {data}=useDeployedContractInfo("ShaboyGames")
  return (
    <>
      
    </>
  );
};

export default Home;
