import Banner from "../../components/Banner/Banner";
import BestWorkers from "./Sections/BestWorkers/BestWorkers";

const Home = () => {
    return (
        <div>
          {/* banner section */}
          <Banner />
          {/* best workers  */}
          <BestWorkers />
        </div>
    );
};

export default Home;