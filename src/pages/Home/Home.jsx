import Banner from "../../components/Banner/Banner";
import BestWorkers from "./Sections/BestWorkers/BestWorkers";
import PopularTask from "./Sections/PopularTask/PopularTask";
import Testimonial from "./Sections/Testimonial/Testimonial";

const Home = () => {
    return (
        <div>
          {/* banner section */}
          <Banner />
          {/* best workers  */}
          <BestWorkers />
          {/* Testimonial */}
          <Testimonial />
          {/* Popular task */}
          <PopularTask />
        </div>
    );
};

export default Home;