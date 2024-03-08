function InputGroup({ id,label, placeholder, type, name, handleChange, className }) {
    return (
        <div>
            <label>{label}</label>
            <input
                id={id}
                type={type}
                name={name}
                className={className}
                placeholder={placeholder}
                onChange={handleChange}
            />
        </div>
    )
}

export default InputGroup