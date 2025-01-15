import { Card } from "antd";
import PropTypes from "prop-types";
import { BiCoinStack } from "react-icons/bi";

const BestWorkerCard = ({ worker }) => {
  const { Meta } = Card;
  const { profilePicture, availableCoin, name } = worker;

  return (
    <div className="flex justify-center items-center p-4 w-full">
      <Card
        hoverable
        style={{
          width: '100%',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        }}
        cover={
          <div className="flex justify-center items-center mt-4">
            <img
              alt={`${name}'s profile`}
              src={profilePicture}
              className="w-24 h-24 mx-auto object-cover rounded-full border-4 border-teal-500"
            />
          </div>
        }
      >
        <Meta
          className="text-center mt-2"
          title={<p className="text-xl font-medium flex justify-center items-center gap-2">
            <span>Coin:</span>
            <span className="flex items-center justify-center text-gray-700"><BiCoinStack /> {availableCoin}</span>
          </p>}
        />
      </Card>
    </div>
  );
};

BestWorkerCard.propTypes = {
  worker: PropTypes.object.isRequired,
};

export default BestWorkerCard;
