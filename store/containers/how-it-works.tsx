import FeatureBlock from '@store/components/feature-block';
import React from 'react';

const data = [
  {
    id: 1,
    background: '#feeec8',
    title: 'Your Order',
    description: 'Add products to your cart, enter your details and confirm.'
  },
  {
    id: 2,
    background: '#ceeffe',
    title: 'Picking your order',
    description:
      'Your order is being picked and now will be forwarded for packaging.'
  },
  {
    id: 3,
    background: '#d4f8c4',
    title: 'Packing Your Order',
    description: 'We are packing your order and will be out for delivery soon.'
  },
  {
    id: 4,
    background: '#d8dafe',
    title: 'Deliver',
    description:
      'Your order has been prepared and out for delivery. It will be delivered soon.'
  }
];

export default function HowItWorks() {
  return (
    <div className="flex w-full px-15px lg:px-35px mt-35px xxl:mt-60px">
      <div className="flex w-full px-20px md:p-30px py-40px rounded border border-gray-300 bg-white">
        <div className="feature-block-wrapper w-full grid grid-cols-1 gap-x-30px gap-y-40px md:grid-cols-2 xl:grid-cols-4 xxl:gap-30px">
          {data.map((item, index) => (
            <FeatureBlock
              key={item.id}
              title={item.title}
              description={item.description}
              counterBg={item.background}
              counter={index + 1}
              className="feature-block"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
