import React from 'react';
import { TextInput, TextInputProps, View } from 'react-native';

import { cn } from '~/lib/cn';

interface InputProps extends TextInputProps {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
  classNameLayout?: string;
}

const Input = React.forwardRef<React.ElementRef<typeof TextInput>, InputProps>(
  ({ className, placeholderClassName, leftIcon, rightIcon, classNameLayout, ...props }, ref) => {
    return (
      <View
        className={cn(
          ' w-full flex-row items-center justify-between gap-2 rounded-lg border border-muted p-2',
          classNameLayout
        )}>
        <View className="w-72 flex-row items-center gap-2">
          {leftIcon && <View>{leftIcon}</View>}
          <TextInput
            className={cn('w-full placeholder:text-muted ', className)}
            {...props}
            ref={ref}
          />
        </View>
        {rightIcon && <View>{rightIcon}</View>}
      </View>
    );
  }
);

Input.displayName = 'Input';

export { Input };
