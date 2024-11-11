const LoadMoreDataBtn = ({ state, fetchDataFun, additionalParam }) => {
  if (state != null && state.totalDocs > state.results.length) {
    return (
      <button
        className="text-dark-grey py-2 px-3 hover:bg-grey/30 round-md flex items-center gap-2"
        onClick={() =>
          fetchDataFun({ ...additionalParam, page: state.page + 1 })
        }
      >
        Load More
      </button>
    );
  }
};

export default LoadMoreDataBtn;
