import React from 'react';

type PropsType = {
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;

    label: string;
    placeholder: string;
}

const Comp: React.FC<PropsType> = (
    {
        value,
        setValue,

        label,
        placeholder
    }
) =>
{
    function onChange(e: React.ChangeEvent<HTMLInputElement>)
    {
        let text = e.target.value
        setValue(text)
    }

    return (
        <div className="input-group mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">{label}</span>
            </div>
            <input
                type="text"
                className="form-control"
                defaultValue=""
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                aria-label={placeholder}
                aria-describedby="basic-addon1"
            />
        </div>
    );
}

export default Comp;
