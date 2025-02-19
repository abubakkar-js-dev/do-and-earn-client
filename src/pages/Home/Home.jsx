import { Helmet } from "react-helmet-async";
import Banner from "../../components/Banner/Banner";
import BestWorkers from "./Sections/BestWorkers/BestWorkers";
import GetInTouch from "./Sections/GetInTouch/GetInTouch";
import HowItWorks from "./Sections/HowItWorks/HowItWorks";
import PopularTask from "./Sections/PopularTask/PopularTask";
import Testimonial from "./Sections/Testimonial/Testimonial";
import FAQSection from "./Sections/Faq/FaqSection";
import FooterBanner from "./Sections/FooterBanner/FooterBanner";


const Home = () => {
    return (
        <div>
          <Helmet>
          <title>Home | Do&Earn</title>
          </Helmet>
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
          {/* Task Platform Banner */}
          <FooterBanner />
          {/* Faq */}
          <FAQSection />  
          {/* Get touch In */}
          <GetInTouch />
        </div>
    );
};

export default Home;