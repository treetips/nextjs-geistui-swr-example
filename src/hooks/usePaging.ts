type Props = {
  pageLimit?: number;
  pageMax?: number;
};

/**
 * Custom Hooks for Paging
 * @author treetips
 */
export const usePaging = (props?: Props) => {
  const pageLimit = props?.pageLimit || 5;
  const pageMax = props?.pageMax || Number.MAX_VALUE;

  /**
   * Calculate the number of page numbers
   * @param searchResultCount search result count
   * @returns page number
   */
  const getPageNumber = (searchResultCount: number): number => {
    return Math.ceil(searchResultCount / pageLimit);
  };

  return {
    pageMax,
    pageLimit,
    getPageNumber,
  } as const;
};
