import TextInput from './TextInput';

export default function SearchBar({ labelName, placeHolder, data, setData, error }) {
    return (
        <div className="flex items-center space-x-5 my-4">
            <TextInput
                id="search"
                type="text"
                name="search"
                value={data.search}
                className="border rounded-md p-2"
                autoComplete=""
                isFocused={false}
                placeholder={placeHolder}
                onChange={(e) => setData('search', e.target.value)}
            />
            <button
                type="submit"
                className="p-2 rounded-md text-lg bg-[#7A163C] text-white font-bold hover:cursor-pointer hover:bg-slate-700 flex items-center">
                Rechercher
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.9 14.32a8 8 0 111.414-1.414l4.387 4.387a1 1 0 01-1.414 1.414l-4.387-4.387zM8 14a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" />
                </svg>
            </button>
        </div>
    );
}
