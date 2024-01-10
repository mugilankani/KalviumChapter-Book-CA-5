import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';

function Form() {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const validate = (ini) => {
    const errors = {};

    if (!ini.name) {
      errors.name = 'Name is required';
    }

    if (!ini.email) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(ini.email)) {
      errors.email = 'Invalid email address';
    }

    if (ini.password.length < 10 || ini.password.length > 20) {
      errors.password = 'Password must be between 10 and 20 characters';
    }

    if (ini.password !== ini.confirmPassword) {
      errors.confirmPassword = 'Password and confirm password do not match';
    }

    return errors;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const errors = validate(formik.values);
    setFormErrors(errors);
    setIsSubmit(true);

    if (Object.keys(errors).length === 0) {
      setSuccessMessage('Registration successful!');
    }
  };

  useEffect(() => {
    setSuccessMessage('');
  }, [formik.values]);

  return (
    <div className='flexDivForm'>
      <form onSubmit={onSubmit} className='regForm'>
        {successMessage && <div className='successMessage'>{successMessage}</div>}

        <input
          placeholder='Name'
          name='name'
          type='text'
          onChange={formik.handleChange}
        />
        {formErrors.name && <div className='error'>{formErrors.name}</div>}

        <input
          placeholder='Email'
          name='email'
          type='text'
          onChange={formik.handleChange}
        />
        {formErrors.email && <div className='error'>{formErrors.email}</div>}

        <input
          placeholder='Password'
          name='password'
          type='password'
          onChange={formik.handleChange}
        />
        {formErrors.password && <div className='error'>{formErrors.password}</div>}

        <input
          placeholder='Confirm Password'
          name='confirmPassword'
          type='password'
          onChange={formik.handleChange}
        />
        {formErrors.confirmPassword && (
          <div className='error'>{formErrors.confirmPassword}</div>
        )}

        <button type='submit' className='regBtn'>
          Register
        </button>
      </form>
    </div>
  );
}

export default Form;
