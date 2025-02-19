import PropTypes from "prop-types";

const SortingControls = ({ sortCriteria, setSortCriteria, sortOrder, setSortOrder }) => {
    return (
        <div className="flex flex-col md:flex-row items-center gap-4 mb-8 dark:text-gray-200">
            <label className="flex items-center gap-2">
                Sort by:
                <select
                    value={sortCriteria}
                    onChange={(e) => setSortCriteria(e.target.value)}
                    className="p-2 border rounded dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
                >
                    <option value="payable_amount">Price</option>
                </select>
            </label>
            <label className="flex items-center gap-2">
                Order:
                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="p-2 border rounded dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
                >
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </label>
        </div>
    );
};

export default SortingControls;

SortingControls.propTypes = {
    sortCriteria: PropTypes.string.isRequired,
    setSortCriteria: PropTypes.func.isRequired,
    sortOrder: PropTypes.string.isRequired,
    setSortOrder: PropTypes.func.isRequired,
};
