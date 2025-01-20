import React from 'react';
import PropTypes from 'prop-types';

import { USER_PERMISSIONS } from 'constants';
import { participationStatusOptions } from 'config/admin/clubMembers';

import NameInputBox from 'components/common/NameInputBox';
import CustomInput from 'components/common/CustomInput/CustomInput';
import CustomRadio from 'components/common/CustomRadio';
import CustomButton, {
  defaultButtonStyle,
} from 'components/common/CustomButton';
import CustomSelect from 'components/common/CustomSelect';
import CustomCheckbox from 'components/common/CustomCheckbox';

const MemberForm = ({
  type = 'add',
  formValues,
  errors,
  handleInputChange,
  handleRadioChange,
  handleCheckboxChange,
  handleButton,
  loading,
}) => {
  return (
    <>
      <NameInputBox
        label="Name"
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
        label="Membership Status"
        options={participationStatusOptions}
        value={formValues.participationStatus}
        name="participationStatus"
        error={errors.participationStatus}
        onChange={handleInputChange}
      />
      {type === 'add' && (
        <CustomCheckbox
          label="Send an invitation?"
          checked={formValues.sendInvitation}
          onChange={() => handleCheckboxChange('sendInvitation')}
        />
      )}
      <CustomRadio
        label="Permissions"
        options={USER_PERMISSIONS}
        values={[formValues.role]}
        onChange={(value) => handleRadioChange('role', value)}
        isText={true}
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
        {type === 'add' ? 'Add Member' : 'Save Changes'}
      </CustomButton>
    </>
  );
};

MemberForm.propTypes = {
  type: PropTypes.string,
  formValues: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleRadioChange: PropTypes.func.isRequired,
  handleCheckboxChange: PropTypes.func,
  handleButton: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default MemberForm;
