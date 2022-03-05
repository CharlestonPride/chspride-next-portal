import { useField, FieldHookConfig, Field } from "formik";
import DatePicker from "react-datepicker";

const TextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props as FieldHookConfig<any>);
  return (
    <div className="form-group">
      <label htmlFor={props.id || props.name} className="form-control-label">
        {label}
      </label>
      <input className="form-control" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

const UsernameInput = ({ label, disabled, ...props }) => {
  const [field, meta] = useField(props as FieldHookConfig<any>);
  return (
    <div className="form-group">
      <label htmlFor={props.id || props.name} className="form-control-label">
        {label}
      </label>

      <div className="input-group">
        <input
          type="text"
          className="form-control"
          {...field}
          {...props}
          disabled={disabled}
          placeholder="first.last"
        ></input>
        <span className="input-group-text" id="basic-addon2">
          @charlestonpride.org
        </span>
      </div>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

const TextArea = ({ label, ...props }) => {
  const [field, meta] = useField(props as FieldHookConfig<any>);
  return (
    <div className="form-group">
      <label htmlFor={props.id || props.name} className="form-control-label">
        {label}
      </label>
      <textarea className="w-100 form-control" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

const Checkbox = ({ children, ...props }) => {
  const [field, meta] = useField({
    ...props,
    type: "checkbox",
  } as FieldHookConfig<any>);
  return (
    <div className="form-check form-switch">
      <input
        {...field}
        {...props}
        type="checkbox"
        className="form-check-input"
      />
      {children}
      <label className="form-check-label" />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

const Select = ({ label, ...props }) => {
  const [field, meta] = useField(props as FieldHookConfig<any>);
  return (
    <div className="form-group">
      <label htmlFor={props.id || props.name} className="form-control-label">
        {label}
      </label>
      <select className="form-control" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

const DateInput = ({ label, ...props }) => {
  return (
    <div className="form-group">
      <label htmlFor={props.id || props.name} className="form-control-label">
        {label}
      </label>
      <Field name={props.name}>
        {({ field, meta, form: { setFieldValue } }) => {
          return (
            <DatePicker
              {...field}
              selected={field.value || null}
              onChange={(val) => {
                setFieldValue(field.name, val);
              }}
            />
          );
        }}
      </Field>
    </div>
  );
};

const HelpText = ({ children }) => {
  return (
    <div className="my-2">
      <span className="badge bg-gradient-warning">Note</span> {children}
    </div>
  );
};

export {
  TextInput,
  TextArea,
  Checkbox,
  Select,
  DateInput,
  HelpText,
  UsernameInput,
};
