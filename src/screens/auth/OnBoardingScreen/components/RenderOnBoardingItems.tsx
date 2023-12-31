import React from 'react';

import {OnBoardingItem} from './OnBoardingData';
import {BoardingItems} from './BoardingItems';

export const RenderOnBoardingItems = ({item}: {item: OnBoardingItem}) => (
  <BoardingItems heading={item.heading} image={item.image} text={item.text} />
);
