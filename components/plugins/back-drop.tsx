import { BottomSheetBackdropProps } from '@gorhom/bottom-sheet';
import { View, Pressable } from 'react-native';
import { useAnimatedStyle } from 'react-native-reanimated';

interface CustomBackdropProps extends BottomSheetBackdropProps {
  onPress?: () => void;
}

const Backdrop = ({ animatedIndex, style, onPress }: CustomBackdropProps) => {
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: animatedIndex.value,
  }));

  return (
    <Pressable
      onPress={onPress}
      style={[
        style,
        animatedStyle,
        {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
        },
      ]}>
      <View />
    </Pressable>
  );
};

export default Backdrop;
