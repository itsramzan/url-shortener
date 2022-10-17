import apiSlice from "../api/apiSlice";

const urlApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    shorten: builder.mutation({
      query: (data) => ({
        url: "/url/shorten",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["URL"],
    }),
    getUrls: builder.query({
      query: ({ page }) => ({
        url: `/url?page=${page}`,
        method: "GET",
      }),
      keepUnusedDataFor: 3600,
      providesTags: ["URL"],
    }),
    updateUrl: builder.mutation({
      query: ({ id, data, page }) => ({
        url: `/url/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;

          if (response?.data?.result?._id) {
            // Update url cache pessimistically start
            dispatch(
              apiSlice.util.updateQueryData(
                "getUrls",
                { page: arg.page },
                (draft) => {
                  draft.results = draft.results.map((item) => {
                    if (item._id === arg.id) {
                      return response.data.result;
                    }
                    return item;
                  });

                  return draft;
                }
              )
            );
            // Update url cache pessimistically end
          }
        } catch (err) {}
      },
    }),
    deleteUrl: builder.mutation({
      query: ({ id }) => ({
        url: `/url/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["URL"],
    }),
  }),
});

export default urlApi;
export const {
  useShortenMutation,
  useGetUrlsQuery,
  useUpdateUrlMutation,
  useDeleteUrlMutation,
} = urlApi;
