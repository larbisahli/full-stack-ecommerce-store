import { useMemo } from 'react';
export const useSearchable = (data, searchText, searchProps) => {
  return useMemo(() => {
    const regex = new RegExp(searchText, 'i');
    return data.filter((item) =>
      searchProps(item).some((sp) => regex.test(sp))
    );
  }, [data, searchText, searchProps]);
};
// const useSearchable = <T>(data: T[], searchText: string, searchProps: (item: T) => string[]) => {
//   return useMemo(() => {
//     const regex = new RegExp(searchText, "i");
//     return data.filter((item) =>
//       searchProps(item).some((sp) => regex.test(sp))
//     );
//   }, [data, searchText, searchProps]);
// };
// export default useSearchable;
