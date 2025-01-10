function FormGroup({ name, label, value, handleChange, ...rest }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-600">{label}</label>
      <input
        name={name}
        value={value}
        onChange={handleChange}
        className="w-full p-2 border rounded-lg mt-1"
        required
        {...rest}
      />
    </div>
  );
}

export default FormGroup;
