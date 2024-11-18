import React from 'react';
import InputLabel from './InputLabel';
import TextInput from './TextInput';

export default function SearchBar({ labelName, placeHolder, value, setValue }) {
    return (
        <div className="flex items-center space-x-5 my-4">
            <InputLabel
                value={ labelName }
                className="text-xl"
            />
            <TextInput
                id="search"
                type="text"
                name="search"
                value={value}
                className="border rounded-md p-2"
                autoComplete=""
                isFocused={false}
                placeholder={placeHolder}
                onChange={(e) => setValue(e.target.value)}
            />
        </div>
    );
}