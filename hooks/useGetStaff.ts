import { StaffInfoContext } from '@contexts/staff.context';
import { useErrorLogger } from '@hooks/index';
import type { StaffType } from '@ts-types/generated';
import { useContext, useEffect } from 'react';

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

  // const staffId = client?.staffId;

  // const { error } = useQuery<TStaff>(STAFF, {
  //   variables: { id: staffId },
  //   skip: Boolean(!staffId) || !!(staffId && staffInfo?.id),
  //   onCompleted: (data: TStaff) => {
  //     const staff = data?.staff;
  //     const csrfToken = client?.csrfToken;
  //     setStaffInfo({ ...staff, csrfToken });
  //   }
  // });

  // useErrorLogger(error);

  useEffect(() => {
    const csrfToken = client?.csrfToken;
    if (csrfToken) {
      setStaffInfo((prev) => {
        return { ...prev, csrfToken };
      });
    }
  }, [client, setStaffInfo]);

  return { staffInfo, setStaffInfo };
}
