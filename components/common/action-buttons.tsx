import { BanUser } from '@components/icons/ban-user';
import { CheckMarkCircle } from '@components/icons/checkmark-circle';
import EditIcon from '@components/icons/edit';
import { Eye } from '@components/icons/eye-icon';
import Trash from '@components/icons/trash';
import Link from '@components/ui/link';
import { useModalAction } from '@components/ui/modal/modal.context';
import { useTranslation } from 'next-i18next';

type Props = {
  id: string;
  deleteModalView?: string | any;
  editUrl?: string;
  detailsUrl?: string;
  isUserActive?: boolean;
  userStatus?: boolean;
  isShopActive?: boolean;
  approveButton?: boolean;
};

const ActionButtons = ({
  id,
  deleteModalView,
  editUrl,
  detailsUrl,
  userStatus = false,
  isUserActive = false
}: Props) => {
  const { t } = useTranslation();
  const { openModal } = useModalAction();

  function handleDelete() {
    openModal(deleteModalView, id);
  }

  function handleUserStatus(id: string, state: string) {
    openModal('BAN_CUSTOMER', id, state);
  }

  return (
    <div className="space-s-5 inline-flex items-center w-auto">
      {deleteModalView && (
        <button
          onClick={handleDelete}
          className="text-red-500 transition duration-200 hover:text-red-600 focus:outline-none"
          title={t('text-delete')}
        >
          <Trash width={16} />
        </button>
      )}
      {userStatus && (
        <>
          {isUserActive ? (
            <button
              onClick={() => handleUserStatus(id, 'ban')}
              className="text-red-500 transition duration-200 hover:text-red-600 focus:outline-none"
              title={t('text-ban-user')}
            >
              <BanUser width={20} />
            </button>
          ) : (
            <button
              onClick={() => handleUserStatus(id, 'active')}
              className="text-accent transition duration-200 hover:text-accent focus:outline-none"
              title={t('text-activate-user')}
            >
              <CheckMarkCircle width={20} />
            </button>
          )}
        </>
      )}

      {editUrl && (
        <Link
          href={editUrl}
          className="text-base transition duration-200 hover:text-heading"
          title={t('text-edit')}
        >
          <EditIcon width={16} />
        </Link>
      )}
      {detailsUrl && (
        <Link
          href={detailsUrl}
          className="ml-2 text-base transition duration-200 hover:text-heading"
          title={t('text-view')}
        >
          <Eye width={24} />
        </Link>
      )}
    </div>
  );
};

export default ActionButtons;
