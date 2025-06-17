import 'react-native-get-random-values';

export type PackItem = {
  id: string;
  name: string;
  packed: boolean;
};

export type PackList = {
  id: string;
  title: string;
  items: PackItem[];
  createdAt: string;
};
