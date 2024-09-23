import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextInput({ type = 'text', className = '', isFocused = false, ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <input
            {...props}
            type={type}
            className={
                'bg-[#F7F6F6] border-t-transparent border-x-transparent border-b-[#BB285C] focus:border-[#7A163C] focus:ring-[#7A163C] shadow-sm ' +
                className
            }
            ref={input}
           /* placeholder={placeholder}*/
        />
    );
});
