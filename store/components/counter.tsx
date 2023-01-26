import Minus from '@store/assets/icons/minus-icon';
import Plus from '@store/assets/icons/plus-icon';
import Trash from '@store/assets/icons/trash';

import IconButton from './icon-button';
import { CounterSizes } from './utils/prop-types';
import { CounterBase, CounterSize, CounterValue } from './utils/theme';

type CounterProps = {
  className?: string;
  value: number;
  size?: CounterSizes;
  onDecrement: (e: any) => void;
  onIncrement: (e: any) => void;
};

const Counter: React.FC<CounterProps> = ({
  onDecrement,
  onIncrement,
  value,
  size = 'normal',
  className = ''
}) => {
  const classNames = CounterBase + ' ' + CounterSize[size] + ' ' + className;

  return (
    <div className={classNames}>
      <IconButton
        onClick={onDecrement}
        className={`h-full ${
          size === 'big' ? 'w-60px' : 'w-35px'
        } text-white bg-gray-900 transition duration-300 hover:bg-gray-3a focus:outline-none`}
      >
        {value > 1 ? <Minus /> : <Trash />}
      </IconButton>

      <span className={CounterValue}>{value}</span>

      <IconButton
        onClick={onIncrement}
        className={`h-full ${
          size === 'big' ? 'w-60px' : 'w-35px'
        } text-white bg-gray-900 transition duration-300 hover:bg-gray-3a focus:outline-none`}
      >
        <Plus />
      </IconButton>
    </div>
  );
};

export default Counter;
