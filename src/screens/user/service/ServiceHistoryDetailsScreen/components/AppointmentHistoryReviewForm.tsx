import React, {FC} from 'react';
import {
  Box,
  Button,
  FormControl,
  HStack,
  Icon,
  IconButton,
  Input,
  Pressable,
  Text,
} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useTranslation} from 'react-i18next';
import {Keyboard} from 'react-native';

const Star: FC<{
  selected: boolean;
  onPress: () => void;
}> = ({selected, onPress}) => {
  return (
    <IconButton
      onPress={onPress}
      size="xs"
      _icon={{
        as: Ionicons,
        name: selected ? 'md-star' : 'md-star-outline',
        size: 'lg',
        color: 'warning.400',
      }}
    />
  );
};

export const StarIcon: FC<{
  selected: boolean;
}> = ({selected}) => {
  return (
    <Icon
      as={Ionicons}
      name={selected ? 'md-star' : 'md-star-outline'}
      size="md"
      color="warning.400"
    />
  );
};

type Props = {
  handleSubmit: () => Promise<void>;
  isSubmitting: boolean;
  userReview: string;
  setUserReview: (value: string) => void;
  userRating: string;
  setUserRating: (value: string) => void;
};

export const AppointmentHistoryReviewForm: FC<Props> = ({
  setUserReview,
  userReview,
  handleSubmit,
  isSubmitting,
  setUserRating,
  userRating,
}) => {
  const {t} = useTranslation('OrderDetailsLang');
  return (
    <Pressable onPress={() => Keyboard.dismiss()} mb={3}>
      <Text fontSize="md" mb={2}>
        How did we do?
      </Text>
      <HStack mb={5}>
        {[1, 2, 3, 4, 5].map(rating => (
          <Star
            key={rating}
            onPress={() => setUserRating(String(rating))}
            selected={Number(userRating) >= rating}
          />
        ))}
      </HStack>

      <FormControl w="100%">
        <Text fontSize="md" mb={2}>
          Write your review
        </Text>
        <Input
          minH={100}
          maxH={100}
          multiline
          onChangeText={setUserReview}
          value={userReview}
          placeholder={String(t('enter'))}
          focusOutlineColor={'primary.400'}
          size="lg"
          mb="4"
        />
      </FormControl>

      <Button
        onPress={handleSubmit}
        colorScheme={'secondary'}
        size="lg"
        borderRadius="lg"
        isLoading={isSubmitting}
        isDisabled={isSubmitting}>
        {t('submit')}
      </Button>
    </Pressable>
  );
};
