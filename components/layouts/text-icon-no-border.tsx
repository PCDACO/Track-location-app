import React from 'react';
import { Text, View } from 'react-native';

import { cn } from '~/lib/cn';

interface TextWithIconNoBorderProps {
  icon: React.ReactNode;
  text: string;
  className?: string;
  numberOfLines?: number;
  fontSize?: 'sm' | 'md' | 'lg' | 'xl';
  fontWeight?: 'normal' | 'bold' | 'semibold';
}

export const TextWithIconNoBorder: React.FC<TextWithIconNoBorderProps> = ({
  icon,
  text,
  className,
  numberOfLines = 1,
  fontSize = 'md',
  fontWeight = 'normal',
}) => {
  let fontSizeClass = 'text-base';
  switch (fontSize) {
    case 'sm':
      fontSizeClass = 'text-sm';
      break;
    case 'lg':
      fontSizeClass = 'text-lg';
      break;
    case 'xl':
      fontSizeClass = 'text-xl';
      break;
    default:
      fontSizeClass = 'text-base';
      break;
  }

  let fontWeightClass = 'font-normal';
  switch (fontWeight) {
    case 'bold':
      fontWeightClass = 'font-bold';
      break;
    case 'semibold':
      fontWeightClass = 'font-semibold';
      break;
    default:
      fontWeightClass = 'font-normal';
      break;
  }

  const textClass = cn(fontSizeClass, fontWeightClass);

  return (
    <View className="flex-row items-center gap-2">
      {icon}
      <Text
        numberOfLines={numberOfLines}
        ellipsizeMode="tail"
        className={cn('flex-1 text-foreground', className, textClass)}>
        {text}
      </Text>
    </View>
  );
};
