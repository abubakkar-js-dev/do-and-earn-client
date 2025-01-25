import { useState, useEffect } from "react";
import { Badge, Card } from "antd";
import { IoBarbellOutline } from "react-icons/io5";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

const NotificationPopUp = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: notifications = [] } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/notifications/${user?.email}`);
      return res.data;
    },
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleClickOutside = () => {
      setIsVisible(false);
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const toggleVisibility = (e) => {
    e.stopPropagation();
    setIsVisible((prev) => !prev);
  };

  return (
    <div className="relative inline-block">
      {/* Badge Icon */}
      <div onClick={toggleVisibility} className="cursor-pointer">
        <Badge dot={notifications.length > 0}>
          <IoBarbellOutline style={{ fontSize: "24px" }} />
        </Badge>
      </div>

      {/* Notification Pop-up */}
      {isVisible && (
        <div
          className="absolute right-0 mt-2 w-80 md:w-96 bg-white shadow-lg rounded-lg border border-gray-200 z-50"
          onClick={(e) => e.stopPropagation()}
          style={{maxHeight: "500px", overflowY: "auto"}}
        >
          <Card title="Notifications" bordered={false} className="p-2">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div
                  key={notification._id}
                  className="p-3 mb-2 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100"
                >
                  <p className="text-sm text-gray-700">{notification.message}</p>
                  <a
                    href={notification.actionRoute}
                    className="text-blue-500 text-xs mt-1 inline-block"
                  >
                    View Details
                  </a>
                  <p className="text-gray-400 text-xs mt-1">
                    {new Date(notification.time).toLocaleString()}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No notifications available.</p>
            )}
          </Card>
        </div>
      )}
    </div>
  );
};

export default NotificationPopUp;
