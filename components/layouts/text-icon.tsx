import React from 'react';
import { Text, View } from 'react-native';

import { cn } from '~/lib/cn';

interface TextWithIconProps {
  icon: React.ReactNode;
  text: string;
  className?: string;
  numberOfLines?: number;
}

export const TextWithIcon: React.FC<TextWithIconProps> = ({
  icon,
  text,
  className,
  numberOfLines = 1,
}) => {
  return (
    <View className="flex-row items-center gap-2 rounded-lg border border-muted p-2">
      {icon}
      <Text
        numberOfLines={numberOfLines}
        ellipsizeMode="tail"
        className={cn('flex-1 text-foreground', className)}>
        {text}
      </Text>
    </View>
  );
};
