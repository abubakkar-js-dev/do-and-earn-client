
import { Card, Avatar, Badge } from 'antd';
import { UserOutlined, IdcardOutlined, DollarOutlined } from '@ant-design/icons';
import Loading from '../../components/Loading/Loading';
import useUserData from '../../hooks/useUserData';

const MyProfile = () => {
  const { userData, userDataLoading } = useUserData();

  if (userDataLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <Card
        className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden"
      >
        <div className="p-6 flex flex-col items-center">
          <Badge
            count={userData.availableCoin}
            overflowCount={9999}
            style={{ backgroundColor: '#52c41a' }}
          >
            <Avatar
              size={100}
              src={userData.profilePicture}
              icon={<UserOutlined />}
              className="mb-4"
            />
          </Badge>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-200">
            {userData.name}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">{userData.email}</p>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700">
          <div className="p-4 flex items-center">
            <IdcardOutlined className="text-xl text-gray-500 dark:text-gray-400" />
            <span className="ml-2 text-gray-700 dark:text-gray-300">
              Role: {userData.role.charAt(0).toUpperCase() + userData.role.slice(1)}
            </span>
          </div>
          <div className="p-4 flex items-center">
            <DollarOutlined className="text-xl text-gray-500 dark:text-gray-400" />
            <span className="ml-2 text-gray-700 dark:text-gray-300">
              Available Coins: {userData.availableCoin}
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MyProfile;
