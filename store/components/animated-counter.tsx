import Minus from '@store/assets/icons/minus-icon';
import Plus from '@store/assets/icons/plus-icon';
import Trash from '@store/assets/icons/trash';
import React from 'react';
import { animated, useSpring } from 'react-spring';

import IconButton from './icon-button';
import {
  AnimatedCounterBase,
  AnimatedCounterBaseWrapper,
  AnimatedCounterValue
} from './utils/theme';

type AnimatedCounterProps = {
  className?: string;
  value: number;
  onDecrement: (e: any) => void;
  onIncrement: (e: any) => void;
};

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  className = '',
  onDecrement,
  onIncrement,
  value
}) => {
  const width = useSpring({
    width: value ? 110 : 35,
    height: '100%'
  });

  return (
    <div className={'bg-black'}>
      <animated.div style={width}>
        <div className={AnimatedCounterBase}>
          <IconButton
            onClick={onDecrement}
            className="h-full w-35px text-white bg-gray-900 transition duration-300 hover:bg-gray-3a focus:outline-none"
          >
            {value > 1 ? <Minus /> : <Trash />}
          </IconButton>
          <span className={AnimatedCounterValue}>{value ? value : '0'}</span>
          <IconButton
            onClick={onIncrement}
            className="h-full w-35px text-white bg-gray-900 transition duration-300 hover:bg-gray-3a focus:outline-none"
          >
            <Plus />
          </IconButton>
        </div>
      </animated.div>
    </div>
  );
};

export default AnimatedCounter;
