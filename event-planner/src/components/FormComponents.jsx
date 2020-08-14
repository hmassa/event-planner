import React from 'react';
import PropTypes from 'prop-types';

// There's a lot of code duplication when it comes to these form components. It's best to pull the duplicated code out and make it reusable. You can now test these components and know that they'll work everywhere you use them.

export const FormInput = ({ type, name, label, placeholder, required, value, onChange }) => (
  <div className="form-group">
    <label htmlFor={name}>{label}</label>
    <input {...{ type, name, placeholder, required, value, onChange }} />
  </div>
);

FormInput.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

FormInput.defaultProps = {
  required: false
};

export const FormTextArea = ({ name, label, form, required, value, onChange }) => (
  <div className="form-group">
    <label htmlFor={name}>{label}</label>
    <textarea {...{ name, form, required, value, onChange }} />
  </div>
);

FormTextArea.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  form: PropTypes.string.isRequired,
  required: PropTypes.bool,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

FormTextArea.defaultProps = {
  required: false
};
