import PropTypes from 'prop-types';

const SectionTitle = ({ title, subtitle="" }) => {
  return (
    <div className="text-center my-12 px-2">
      <div className="inline-block w-auto before:bg-blue-400 after:bg-blue-600">
        <h2 className="text-4xl font-extrabold text-blue-500 tracking-wide">
          {title}
        </h2>
      </div>
      {subtitle && (
        <p className="text-gray-600 text-lg mt-4 font-medium">
          {subtitle}
        </p>
      )}
    </div>
  );
};

SectionTitle.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};

export default SectionTitle;
