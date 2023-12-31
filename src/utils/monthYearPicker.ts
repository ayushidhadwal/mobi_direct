import {format, sub} from 'date-fns';

export const years: string[] = [];
export const months: {title: string; value: string}[] = [
  {
    title: 'January',
    value: '1',
  },
  {
    title: 'February',
    value: '2',
  },
  {
    title: 'March',
    value: '3',
  },
  {
    title: 'April',
    value: '4',
  },
  {
    title: 'May',
    value: '5',
  },
  {
    title: 'June',
    value: '6',
  },
  {
    title: 'July',
    value: '7',
  },
  {
    title: 'August',
    value: '8',
  },
  {
    title: 'September',
    value: '9',
  },
  {
    title: 'October',
    value: '10',
  },
  {
    title: 'November',
    value: '11',
  },
  {
    title: 'December',
    value: '12',
  },
];

for (
  let i = Number(format(sub(new Date(), {years: 2}), 'yyyy'));
  i <= Number(format(new Date(), 'yyyy'));
  i++
) {
  years.push(String(i));
}
