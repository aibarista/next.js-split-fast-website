import React from 'react';
import PropTypes from 'prop-types';

import { GENDER_OPTIONS } from 'constants';
import { participationStatusOptions } from 'config/admin/athlete';
import NameInputBox from 'components/common/NameInputBox';
import CustomInput from 'components/common/CustomInput/CustomInput';
import CustomSelect from 'components/common/CustomSelect';
import CustomDatePicker from 'components/common/CustomDatePicker';
import CustomButton, {
  defaultButtonStyle,
} from 'components/common/CustomButton';
import LabelText from 'components/common/LabelText';

const headingTextStyle = {
  color: '#24282a',
  fontWeight: 700,
  fontSize: 24,
  marginRight: 10,
};

const AthleteForm = ({
  memberName,
  formValues,
  competingAgeOptions,
  errors,
  loading,
  buttonLabel,
  handleInputChange,
  handleButton,
}) => {
  return (
    <>
      <LabelText
        label="Athlete profile for member"
        text={memberName}
        labelStyle={headingTextStyle}
        textStyle={{
          color: '#889398',
          fontWeight: 600,
          fontSize: 24,
        }}
        style={{ marginBottom: 0, display: 'flex', minWidth: 700 }}
      />
      <LabelText
        label="Athlete Details"
        text=""
        labelStyle={headingTextStyle}
        style={{ marginBottom: 20 }}
      />
      <NameInputBox
        label="Athlete Name"
        formValues={formValues}
        errors={errors}
        handleInputChange={handleInputChange}
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
        value={formValues.birthday}
        onChange={handleInputChange}
        error={errors.birthday}
      />
      <CustomSelect
        label="Competing Age"
        value={formValues.competingAge}
        onChange={handleInputChange}
        name="competingAge"
        options={competingAgeOptions}
        error={errors.competingAge}
      />
      <CustomInput
        label="Club ID Number"
        name="clubAthleteNumber"
        type="number"
        value={formValues.clubAthleteNumber}
        placeholder=""
        onChange={handleInputChange}
        error={errors.clubAthleteNumber}
      />
      <CustomSelect
        label="Participating"
        value={formValues.participationStatus}
        onChange={handleInputChange}
        name="participationStatus"
        options={participationStatusOptions}
        error={errors.participationStatus}
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
        {buttonLabel}
      </CustomButton>
    </>
  );
};

AthleteForm.propTypes = {
  memberName: PropTypes.string,
  formValues: PropTypes.object.isRequired,
  competingAgeOptions: PropTypes.array,
  errors: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  buttonLabel: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleButton: PropTypes.func.isRequired,
};

export default AthleteForm;
