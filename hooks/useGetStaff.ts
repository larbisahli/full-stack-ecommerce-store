import { StaffInfoContext } from '@contexts/staff.context';
import { useErrorLogger } from '@hooks/index';
import type { StaffType } from '@ts-types/generated';
import { fetcher } from '@utils/utils';
import isEmpty from 'lodash/isEmpty';
import { useContext, useEffect } from 'react';
import useSwr from 'swr';
interface TStaff {
  staff: StaffType;
}

interface ClientType {
  staffId: string;
  csrfToken?: string;
  csrfError?: any;
}

export function useGetStaff(client?: ClientType) {
  const { staffInfo, setStaffInfo } = useContext(StaffInfoContext);

  const staffId = client?.staffId;

  const { data, error } = useSwr<TStaff>(
    staffId ? `/api/admin/staff/${staffId}` : null,
    fetcher
  );

  useErrorLogger(error);

  useEffect(() => {
    console.log({ data });
    const { staff = {} } = data ?? {};
    if (!isEmpty(staff)) {
      setStaffInfo(staff as StaffType);
    }
  }, [data, setStaffInfo]);

  return { staffInfo, setStaffInfo };
}
