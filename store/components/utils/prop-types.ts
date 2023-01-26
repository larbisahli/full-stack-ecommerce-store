export const tuple = <T extends string[]>(...args: T) => args;

const buttonVariants = tuple('primary', 'secondary', 'elevation');
const buttonSizes = tuple('big', 'normal', 'small');
const CounterSizes = tuple('big', 'normal');

export type ButtonVariants = typeof buttonVariants[number];
export type ButtonSizes = typeof buttonSizes[number];

export type CounterSizes = typeof CounterSizes[number];
