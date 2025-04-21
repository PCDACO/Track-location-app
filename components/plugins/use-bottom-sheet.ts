import BottomSheet from '@gorhom/bottom-sheet';
import { useCallback, useMemo, useRef, useState } from 'react';

interface UseBottomSheetProps {
  snapPoints?: string[];
}

interface UseBottomSheetReturn {
  sheetRef: React.RefObject<BottomSheet>;
  isSheetOpen: boolean;
  handleSnapPress: (index: number) => void;
  handleSheetChange: (index: number) => void;
  handleClosePress: () => void;
}

export const useBottomSheet = ({
  snapPoints: customSnapPoints = ['1%', '45%'],
}: UseBottomSheetProps = {}): UseBottomSheetReturn => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => customSnapPoints, [customSnapPoints]);

  const handleSnapPress = useCallback(
    (index: number) => {
      sheetRef.current?.snapToIndex(index);
      setIsSheetOpen(index === snapPoints.length - 1);
    },
    [snapPoints.length]
  );

  const handleSheetChange = useCallback(
    (index: number) => {
      setIsSheetOpen(index === snapPoints.length - 1);
    },
    [snapPoints.length]
  );

  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
    setIsSheetOpen(false);
  }, []);

  return {
    sheetRef,
    isSheetOpen,
    handleSnapPress,
    handleSheetChange,
    handleClosePress,
  };
};
