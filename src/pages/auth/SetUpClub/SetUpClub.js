import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import styles from './SetUpClub.module.css';
import routes from 'routes';
import { createClub } from 'api/clubApi';

import AddIcon from 'assets/images/icon_add.png';

import CustomInput from 'components/common/CustomInput/CustomInput';
import CustomImagePicker from 'components/common/CustomImagePicker';
import CustomTextarea from 'components/common/CustomTextarea';
import CustomButton, {
  defaultButtonStyle,
} from 'components/common/CustomButton';

const SetUpClub = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = React.useState(false);
  const [formValues, setFormValues] = React.useState({
    clubName: '',
    description: '',
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formValues.clubName) newErrors.clubName = 'Club Name is required';
    if (!formValues.description)
      newErrors.description = 'Description is required';

    return newErrors;
  };

  const clickGoButton = async () => {
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setLoading(true);
      try {
        await createClub(formValues);

        navigate(routes.admin.dashboard);
        toast.success('Club created successfully.');
      } catch (e) {
        console.log('error: ', e);
        toast.error(e.response.data);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className={styles.clubContainer}>
      <div className={styles.sectionHeading}>
        Add a <span>club</span>
      </div>
      <CustomInput
        label="Club Name"
        name="clubName"
        placeholder="Enter the name of your club"
        onChange={handleInputChange}
        error={errors.clubName}
        labelFontWeight={400}
        labelColor="#313131"
      />
      <CustomImagePicker icon={AddIcon} label="Add Image" />
      <CustomTextarea
        label="Club description"
        name="description"
        placeholder="Describe your club in a couple of sentences"
        error={errors.description}
        onChange={handleInputChange}
      />
      <CustomButton
        style={{
          ...defaultButtonStyle,
          maxWidth: 272,
          marginBottom: 0,
        }}
        disabled={loading}
        onClick={clickGoButton}
      >
        Let&#39;s Go! (OWNER)
      </CustomButton>
    </div>
  );
};

export default SetUpClub;
