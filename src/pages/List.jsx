import React, { useEffect, useState } from "react";
import ListItem from "../components/List/ListItem";
import ListUpdateModal from "../components/List/ListUpdateModal";
import Pagination from "../components/UI/Pagination";
import { useGetUrlsQuery } from "../features/url/urlApi";

const List = () => {
  const [page, setPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [itemForUpdate, setItemForUpdate] = useState(null);
  const pageSize = 8;
  const { isFetching, data, isError } = useGetUrlsQuery({ page });

  useEffect(() => {
    if (data?.results?.length === 0 && page > 1) {
      setPage((prevState) => prevState - 1);
    }
  }, [data, page]);

  const handlePaginate = (current) => {
    setPage(current);
  };

  // Decide what to render
  let content = null;

  if (isFetching) content = <p>Loading...</p>;

  if (!isFetching && isError) content = <p>Something went wrong</p>;

  if (!isFetching && !isError && data?.results?.length === 0)
    content = <p>No item found</p>;

  if (!isFetching && !isError && data?.results?.length > 0) {
    const { results, currentPage, totalItem } = data;

    content = (
      <>
        <h3 className="text-xl text-blue-700 font-semibold">
          Shorten URL list
        </h3>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
          {results.map((item, index) => (
            <ListItem
              key={item._id}
              item={item}
              index={index}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              itemForUpdate={itemForUpdate}
              setItemForUpdate={setItemForUpdate}
            />
          ))}
        </div>

        {totalItem > pageSize && (
          <Pagination
            page={currentPage}
            totalResults={totalItem}
            pageSize={pageSize}
            handlePaginate={handlePaginate}
          />
        )}

        <ListUpdateModal
          page={page}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          itemForUpdate={itemForUpdate}
          setItemForUpdate={setItemForUpdate}
        />
      </>
    );
  }

  return <div className="space-y-4">{content}</div>;
};

export default List;
