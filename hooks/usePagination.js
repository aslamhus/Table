import { useState, useEffect } from 'react';

/**
 *
 * @param {object} props - default values
 * @property {int} props.page - default page
 * @property {int} props.pageLimit - default pageLimit
 * @property {int} props.totalItems - default totalItems
 * @property {function} props.onPageChange - callback when page changes
 * @property {function} props.onPageLimitChange - callback when page limit changes
 * @returns
 */
export const usePagination = ({
  page = 1,
  pageLimit = 5,
  totalItems = 0,
  onPageChange,
  onPageLimitChange,
}) => {
  const [mounted, setMounted] = useState(false);
  const [pagination, _setPagination] = useState({ page, pageLimit, totalItems });

  const setPagination = (value) => {
    _setPagination((prev) => {
      return { ...prev, ...value };
    });
  };

  useEffect(() => {
    if (onPageChange instanceof Function && mounted) {
      onPageChange();
    }
  }, [pagination.page]);

  useEffect(() => {
    if (onPageLimitChange instanceof Function && mounted) {
      onPageLimitChange();
    }
  }, [pagination.pageLimit]);

  useEffect(() => {
    setMounted(true);
  }, []);

  return {
    pagination,
    setPagination,
  };
};
