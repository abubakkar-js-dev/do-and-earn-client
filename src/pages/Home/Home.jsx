import Banner from "../../components/Banner/Banner";
import BestWorkers from "./Sections/BestWorkers/BestWorkers";
import GetInTouch from "./Sections/GetInTouch/GetInTouch";
import HowItWorks from "./Sections/HowItWorks/HowItWorks";
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
          {/* How It works */}
          <HowItWorks />
          {/* Get touch In */}
          <GetInTouch />
        </div>
    );
};

export default Home;