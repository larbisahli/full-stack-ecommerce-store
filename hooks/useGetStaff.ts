import { StaffInfoContext } from '@contexts/staff.context';
import { useErrorLogger } from '@hooks/index';
import type { StaffType } from '@ts-types/generated';
import { fetcher } from '@utils/utils';
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
    const { staff = null } = data ?? {};
    if (staff) {
      setStaffInfo(staff);
    }
  }, [data, setStaffInfo]);

  return { staffInfo, setStaffInfo };
}
