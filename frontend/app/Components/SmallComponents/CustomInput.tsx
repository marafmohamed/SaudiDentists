
// CustomInput.js
import React from 'react';

const CustomInput = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>((props, ref) => (
  <input
    {...props}
    ref={ref}
    type="phone"
    placeholder="Phone Number"
    className="border border-custom-grayLight bg-white p-2 w-full rounded-lg "
    />
));

CustomInput.displayName = 'CustomInput';


export default CustomInput;