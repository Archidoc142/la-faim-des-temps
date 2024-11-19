import React, { useRef } from 'react';
import InputLabel from './InputLabel';
import TextInput from './TextInput';

export default function SearchBar({ labelName, placeHolder, value, setValue, searchWord }) {
    const inputEl = useRef("");

    const getSearchWord = () => {
        searchWord(inputEl.current.value);
    };
    return (
        <div className="flex items-center space-x-5 my-4">
            <TextInput
                id="search"
                ref={inputEl}
                type="text"
                name="search"
                value={value}
                className="border rounded-md p-2"
                autoComplete=""
                isFocused={false}
                placeholder={placeHolder}
                onChange={getSearchWord}
            />
        </div>
    );
}