import { useSettings } from '@contexts/settings.context';
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

  const { data: settingsData, error: settingsError } = useSwr(
    '/api/admin/settings',
    fetcher
  );

  const { updateSettings } = useSettings();

  useErrorLogger(error);
  useErrorLogger(settingsError);

  useEffect(() => {
    console.log({ data });
    const { staff = {} } = data ?? {};
    if (!isEmpty(staff)) {
      setStaffInfo(staff as StaffType);
    }
  }, [data, setStaffInfo]);

  useEffect(() => {
    const { settings } = settingsData ?? {};
    if (!isEmpty(settings)) {
      updateSettings(settings);
    }
  }, [settingsData]);

  return { staffInfo, setStaffInfo };
}
