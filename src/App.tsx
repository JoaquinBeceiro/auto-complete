import { useState } from "react";
import "./App.css";
import { AutoCompleteComponent } from "@/components";
import { searchItems } from "@/services";

function App() {
  const [searchValue, setSearchValue] = useState<string>("");
  const [selected, setSelected] = useState<null | string>(null);

  const handleInputChange = (newValue: string) => {
    setSearchValue(newValue);
  };

  const handleSelectedChange = (value: string) => setSelected(value);

  return (
    <main>
      <h1>Company Name Search</h1>
      <AutoCompleteComponent
        value={searchValue}
        handleInputChange={handleInputChange}
        placeholder="Type to search..."
        searchOptions={searchItems}
        timeOut={500}
        handleSelectedChange={handleSelectedChange}
      />
      {selected && (
        <h3>
          Selected value: <strong>{selected}</strong>
        </h3>
      )}
    </main>
  );
}

export default App;
