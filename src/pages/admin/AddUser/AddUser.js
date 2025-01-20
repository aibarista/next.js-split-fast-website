import React, { useState } from 'react';
import layoutStyles from 'layouts/FormWithFooterLayout/FormWithFooterLayout.module.css';
import { useNavigate, useParams } from 'react-router-dom';

import { GENDER_OPTIONS, USER_PERMISSIONS } from 'constants';

import AddIcon from 'assets/images/icon_add.png';

import NameInputBox from 'components/common/NameInputBox';
import CustomInput from 'components/common/CustomInput/CustomInput';
import CustomSelect from 'components/common/CustomSelect';
import CustomDatePicker from 'components/common/CustomDatePicker';
import CustomImagePicker from 'components/common/CustomImagePicker';
import CustomRadio from 'components/common/CustomRadio';
import CustomCheckbox from 'components/common/CustomCheckbox';
import CustomTextarea from 'components/common/CustomTextarea';
import CustomButton, {
  defaultButtonStyle,
} from 'components/common/CustomButton';
import { toast } from 'react-toastify';
import { createClubMember } from 'api/userApi';
import routes from 'routes';

const AddUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    gender: '',
    birthday: '',
    role: 'Member',
    sendInvitation: false,
    note: '',
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formValues.firstName) newErrors.firstName = 'First name is required';
    if (!formValues.lastName) newErrors.lastName = 'Last name is required';
    if (!formValues.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      newErrors.email = 'Email address is invalid';
    }

    if (!formValues.gender) newErrors.gender = 'Gender not selected';

    if (!formValues.birthday) newErrors.birthday = 'Birthday is required';

    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleButton = async () => {
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setLoading(true);
      try {
        await createClubMember({ ...formValues, clubID: id });
        toast.success('Member created successfully');
        navigate(routes.admin.dashboard);
      } catch (err) {
        console.log(err);
        toast.error(err.response.data);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className={layoutStyles.formContainer}>
      <div className={layoutStyles.sectionHeading}>
        Add a <span>user</span>
      </div>
      <NameInputBox
        formValues={formValues}
        errors={errors}
        handleInputChange={handleInputChange}
      />
      <CustomInput
        label="Email Address"
        name="email"
        value={formValues.email}
        placeholder="myemail@gmail.com"
        onChange={handleInputChange}
        error={errors.email}
      />
      <CustomSelect
        label="Gender"
        value={formValues.gender}
        onChange={handleInputChange}
        name="gender"
        options={GENDER_OPTIONS}
        error={errors.gender}
      />
      <CustomDatePicker
        label="Date of Birth"
        name="birthday"
        onChange={handleInputChange}
        error={errors.birthday}
      />
      <CustomImagePicker icon={AddIcon} label="Add Image" />
      <CustomRadio
        label="Permissions"
        options={USER_PERMISSIONS}
        values={[formValues.role]}
        onChange={(value) => setFormValues({ ...formValues, role: value })}
        isText={true}
      />
      <CustomCheckbox
        label="Send an invitation?"
        checked={formValues.sendInvitation}
        onChange={() =>
          setFormValues({
            ...formValues,
            sendInvitation: !formValues.sendInvitation,
          })
        }
      />
      <CustomTextarea
        label="Note"
        onChange={handleInputChange}
        error={errors.note}
        name="note"
        placeholder="Write a note to the user if you would like to"
        maxLength={100}
        style={{
          marginBottom: 28,
        }}
        inputStyle={{
          height: 91,
        }}
      />
      <CustomButton
        style={{
          ...defaultButtonStyle,
          maxWidth: 279,
          marginBottom: 49,
        }}
        onClick={handleButton}
        disabled={loading}
      >
        Create Athlete
      </CustomButton>
    </div>
  );
};

export default AddUser;
