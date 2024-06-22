
import type { NextPage } from "next";
import BannerArea from "~~/components/homepage/BannerArea";
import NewGames from "~~/components/homepage/NewItems";
import { useDeployedContractInfo} from "~~/hooks/scaffold-stark";
const Home: NextPage = () => {
  const {data}=useDeployedContractInfo("ShaboyGames")
  return (
    <>
      <BannerArea />
      <NewGames />
    </>
  );
};

export default Home;
