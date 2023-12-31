import i18n from '../../../../i18n';
export type OnBoardingItem = {
  id: string;
  image: any;
  heading: string;
  text: string;
};

export const OnBoardingData = [
  {
    id: '1',
    image: require('../../../../assets/item11.png'),
    heading: i18n.t('OnboardingLang:heading1'),
    text: i18n.t('OnboardingLang:text1'),
  },
  {
    id: '2',
    image: require('../../../../assets/item12.png'),
    heading: i18n.t('OnboardingLang:heading2'),
    text: i18n.t('OnboardingLang:text2'),
  },
  {
    id: '3',
    image: require('../../../../assets/item13.png'),
    heading: i18n.t('OnboardingLang:heading3'),
    text: i18n.t('OnboardingLang:text3'),
  },
];
