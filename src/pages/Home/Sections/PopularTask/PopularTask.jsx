import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../../components/SectionTitle/SectionTitle";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import TaskCard from "../../../../components/TaskCard/TaskCard";
import Loading from "../../../../components/Loading/Loading";

const PopularTask = () => {
  const axiosPublic = useAxiosPublic();
  const { data: popularTasks = [], isLoading } = useQuery({
    queryKey: ["popularTasks"],
    queryFn: async () => {
      const res = await axiosPublic.get("/popular-tasks");
      return res.data;
    },
  });

  // console.log(popularTasks);

  if (isLoading) return <Loading />;

  return (
    <div className="py-10">
      <SectionTitle
        title="Popular Tasks"
        subtitle="Discover the most rewarding tasks and jobs to maximize your earnings today"
      />

      {/* Card Container */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {popularTasks.map((task) => (
          <TaskCard key={task._id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default PopularTask;
