import React from 'react';
import { Text, View } from 'react-native';

import { cn } from '~/lib/cn';

interface FieldLayoutProps {
  children: React.ReactNode;
  label: string;
  className?: string;
}

const FieldLayout: React.FC<FieldLayoutProps> = ({ children, label, className }) => {
  return (
    <View className="flex flex-col gap-2">
      <Text className={cn('text-sm font-bold text-muted-foreground', className)}>{label}</Text>
      <View>{children}</View>
    </View>
  );
};

export default FieldLayout;
