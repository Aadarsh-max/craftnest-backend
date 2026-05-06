const paginate = (page, limit) => {
  const currentPage = Number(page) || 1;
  const perPage = Number(limit) || 10;

  const skip = (currentPage - 1) * perPage;

  return {
    currentPage,
    perPage,
    skip,
  };
};

export default paginate;