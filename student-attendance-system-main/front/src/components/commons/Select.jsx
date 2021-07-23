const Select = ({name, label, displayValue, actualValue, options, error, ...rest}) => {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <select name={name} id={name} {...rest} className="form-select">
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option._id} value={option[actualValue]} className="text-capitalize">
            {option[displayValue]}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
}
 
export default Select;