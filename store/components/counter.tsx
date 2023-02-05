import Minus from '@store/assets/icons/minus-icon';
import Plus from '@store/assets/icons/plus-icon';
import Trash from '@store/assets/icons/trash';
import cn from 'classnames';

import IconButton from './icon-button';
import { CounterSizes } from './utils/prop-types';

type CounterProps = {
  className?: string;
  value: number;
  size?: CounterSizes;
  disabled: boolean;
  onDecrement: (e: any) => void;
  onIncrement: (e: any) => void;
};

const Counter: React.FC<CounterProps> = ({
  onDecrement,
  onIncrement,
  disabled,
  value,
  size = 'normal'
}) => {
  return (
    <div className="group flex items-center h-6 justify-between flex-shrink-0 rounded overflow-hidden bg-gray-900 shadow-floatingUp">
      <IconButton
        onClick={onDecrement}
        className={`h-full ${
          size === 'big' ? 'w-60px' : 'w-35px'
        } text-white bg-gray-900 transition duration-300  hover:bg-gray-3a focus:outline-none`}
      >
        {value > 1 ? <Minus /> : <Trash />}
      </IconButton>

      <span className="font-semibold text-13px text-white flex items-center justify-center h-full w-40px transition-colors duration-250 ease-in-out cursor-default">
        {value}
      </span>

      <IconButton
        onClick={onIncrement}
        disabled={disabled}
        className={cn(
          'h-full text-white w-35px bg-gray-900 transition duration-300 hover:bg-gray-3a focus:outline-none',
          { 'bg-gray-3a': disabled }
        )}
      >
        <Plus />
      </IconButton>
    </div>
  );
};

export default Counter;
