export interface SearchInputProps extends React.HTMLProps<HTMLInputElement> {
  handleInputChange: (value: string) => void;
  searchOptions: (value: string) => Promise<{ key: string; value: string }[]>;
  timeOut?: number;
  handleSelectedChange: (value: string) => void;
}
