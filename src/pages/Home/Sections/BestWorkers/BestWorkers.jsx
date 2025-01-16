import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../../components/SectionTitle/SectionTitle";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import BestWorkerCard from "../BestWorkerCard/BestWorkerCard";

const BestWorkers = () => {
    const axiosPublic = useAxiosPublic();

    const {data: bestWorkers=[],} = useQuery({
        queryKey: ['bestWorkers'],
        queryFn: async()=>{
            const res = await axiosPublic.get('/best-workers');
            return res.data;
        }
    })

    console.log(bestWorkers);
    
    return (
        <div className="bg-green-50 -mt-12 py-10">
            <SectionTitle title="Meet Our Best Workers" subtitle="Dedicated, Skilled, and Passionate Professionals Who Drive Excellence Every Day" />
            {/* best workers card here */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
                {
                    bestWorkers.map((item)=> <BestWorkerCard key={item._id} worker={item} />)
                }
            </div>            
        </div>
    );
};

export default BestWorkers;