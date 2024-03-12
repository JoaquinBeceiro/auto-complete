import "./styles.css";
import { useState, useEffect, useCallback } from "react";
import { SearchInputProps } from "./types";
import { InputComponent } from "..";
import { KeyValueType } from "@/services/types";

const DEFAULT_TIMEOUT = 500;

function AutoComplete({
  value,
  placeholder,
  handleInputChange,
  searchOptions,
  timeOut,
  handleSelectedChange,
}: SearchInputProps) {
  const [results, setResults] = useState<KeyValueType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selected, setSelected] = useState<null | string>(null);
  const [isFocus, setIsFocus] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSearch = useCallback(
    async (value: string) => {
      setIsLoading(true);
      setIsError(false);
      try {
        const items = await searchOptions(value);
        setResults(items);
      } catch (e) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    },
    [searchOptions]
  );

  useEffect(() => {
    setIsLoading(true);
    const timeOutId = setTimeout(() => {
      if (value !== "" && selected === null) {
        handleSearch(value as string);
      } else {
        setResults([]);
      }
    }, timeOut || DEFAULT_TIMEOUT);
    return () => clearTimeout(timeOutId);
  }, [handleSearch, selected, timeOut, value]);

  useEffect(() => {
    if (selected) {
      handleSelectedChange(selected);
    }
  }, [handleSelectedChange, selected]);

  const textWithHighlight = (text: string) => {
    const regEx = new RegExp(value as string, "ig");
    return {
      __html: text.replace(regEx, '<mark class="highlight">$&</mark>'),
    };
  };

  const handleListElementClick = (
    event: React.FormEvent<HTMLLIElement>,
    newValue: string
  ) => {
    event.preventDefault();
    handleInputChange(newValue);
    setSelected(newValue);
  };

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    setSelected(null);
    handleInputChange(event.currentTarget.value);
  };

  const showOptions = isFocus && value !== "" && selected === null;

  const OptionList = () => {
    if (isLoading) return <p>Loading...</p>;
    if (results.length === 0) return <p>No results</p>;
    if (isError)
      return <p className="error">Oops! There was an error. Try again</p>;

    return (
      <ul>
        {results.map(({ value, key }) => (
          <li
            key={key}
            dangerouslySetInnerHTML={textWithHighlight(value)}
            onMouseDown={(event) => handleListElementClick(event, value)}
          />
        ))}
      </ul>
    );
  };

  return (
    <div className="input-container">
      <InputComponent
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
      />

      {showOptions && <div className="auto-complete-box">{OptionList()}</div>}
    </div>
  );
}

export default AutoComplete;
