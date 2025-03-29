import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { TextInput, View } from 'react-native';

import useDebounce from '~/hooks/plugins/use-debounce';
import { cn } from '~/lib/cn';
import { useSearchStore } from '~/store/use-search';

interface SearchInputProps {
  placeholder?: string;
  className?: string;
}

export const SearchInput = ({ placeholder = 'Search...', className = '' }: SearchInputProps) => {
  const [searchKey, setSearchKey] = React.useState('');
  const { setSearchKeyword } = useSearchStore();
  const searchDebounce = useDebounce(searchKey, 500);

  React.useEffect(() => {
    setSearchKeyword(searchDebounce);
  }, [searchDebounce]);

  return (
    <View
      className={cn(
        'w-full flex-row items-center gap-2 rounded-lg bg-white px-4 py-2 dark:bg-slate-300',
        className
      )}>
      <Ionicons name="search" size={20} color="#4B5563" />
      <TextInput
        className="mr-2 flex-1 text-base text-gray-900"
        placeholder={placeholder}
        value={searchKey}
        onChangeText={(text) => {
          console.log('text', text);

          setSearchKey(text);
        }}
        placeholderTextColor="#9CA3AF"
      />
    </View>
  );
};
