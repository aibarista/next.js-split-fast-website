import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import {
  ageGroupOptions,
  fieldEventOptions,
  groupDistanceEventOptions,
  hurdleEventOptions,
  multiLaneSprintEventOptions,
  relayEventOptions,
  sprintAgilityTrainingOptions,
  statusOptions,
  walkEventOptions,
  meetTypeOptions,
} from 'config/admin/meet';

import { getTimezones } from 'api/generalApi';

import CustomInput from 'components/common/CustomInput/CustomInput';
import CustomDatePicker from 'components/common/CustomDatePicker';
import CustomTimePicker from 'components/common/CustomTimePicker';
import CustomTextarea from 'components/common/CustomTextarea';
import CustomRadio from 'components/common/CustomRadio';
import CustomSelect from 'components/common/CustomSelect';
import CustomButton, {
  defaultButtonStyle,
} from 'components/common/CustomButton';

const MeetForm = ({
  formValues,
  loading = false,
  errors,
  handleInputChange,
  handleTimeChange,
  handleTimezoneChange,
  handleRadioChange,
  handleButton,
}) => {
  const [timezoneList, setTimezoneList] = useState([]);

  const fetchTimezoneList = useCallback(async () => {
    try {
      const response = await getTimezones();

      console.log('timezones: ', response.data);
      setTimezoneList(response.data);
    } catch (err) {
      console.log('[MeetForm] Fetch timezone list error: ', err);
    }
  }, []);

  useEffect(() => {
    fetchTimezoneList().then(() => {
      console.log('Timezone list fetched successfully');
    });
  }, [fetchTimezoneList]);

  return (
    <>
      <CustomSelect
        label="Meet Type"
        options={meetTypeOptions}
        value={formValues.meetType}
        onChange={handleInputChange}
        error={errors.meetType}
        name="meetType"
      />
      <CustomInput
        label="Meet Title"
        placeholder="Enter the meet title"
        name="meetName"
        value={formValues.meetName}
        onChange={handleInputChange}
        error={errors.meetName}
      />
      <CustomDatePicker
        label="Meet Date"
        name="date"
        onChange={handleInputChange}
        error={errors.date}
        value={formValues.date}
      />
      <CustomTimePicker
        label="From"
        placeholder="00:00"
        style={{ marginBottom: 20, width: 176 }}
        error={errors.time}
        onTimeChange={handleTimeChange}
        value={formValues.time}
        selectedTimezone={formValues.timezone}
        timezoneList={timezoneList}
        handleTimezoneChange={handleTimezoneChange}
      />
      <CustomInput
        label="Location"
        name="location"
        error={errors.location}
        onChange={handleInputChange}
        value={formValues.location}
      />
      <CustomTextarea
        label="Meet Description"
        placeholder=""
        name="description"
        value={formValues.description}
        onChange={handleInputChange}
        error={errors.description}
        style={{
          marginBottom: 20,
        }}
      />
      <CustomRadio
        label="Participating age groups"
        options={ageGroupOptions}
        values={formValues.ageGroups}
        onChange={(value) => handleRadioChange('ageGroups', value)}
        error={errors.ageGroups}
      />
      <CustomRadio
        label="Multi-lane sprint events"
        options={multiLaneSprintEventOptions}
        values={formValues.multiLaneEvents}
        onChange={(value) => handleRadioChange('multiLaneEvents', value)}
      />
      <CustomRadio
        label="Hurdle events"
        options={hurdleEventOptions}
        values={formValues.hurdleEvents}
        onChange={(value) => handleRadioChange('hurdleEvents', value)}
      />
      <CustomRadio
        label="Relay events"
        options={relayEventOptions}
        values={formValues.relayEvents}
        onChange={(value) => handleRadioChange('relayEvents', value)}
      />
      <CustomRadio
        label="Group distance events"
        options={groupDistanceEventOptions}
        values={formValues.groupDistanceEvents}
        onChange={(value) => handleRadioChange('groupDistanceEvents', value)}
      />
      <CustomRadio
        label="Walk events"
        options={walkEventOptions}
        values={formValues.walkEvents}
        onChange={(value) => handleRadioChange('walkEvents', value)}
      />
      <CustomRadio
        label="Sprint & agility training"
        options={sprintAgilityTrainingOptions}
        values={formValues.sprintAgilityTraining}
        onChange={(value) => handleRadioChange('sprintAgilityTraining', value)}
      />
      <CustomRadio
        label="Field events"
        options={fieldEventOptions}
        values={formValues.fieldEvents}
        onChange={(value) => handleRadioChange('fieldEvents', value)}
      />
      <CustomSelect
        label="Status"
        options={statusOptions}
        value={formValues.meetStatus}
        onChange={handleInputChange}
        error={errors.meetStatus}
        name="meetStatus"
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
        Save
      </CustomButton>
    </>
  );
};

MeetForm.propTypes = {
  formValues: PropTypes.object.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleTimeChange: PropTypes.func.isRequired,
  handleRadioChange: PropTypes.func.isRequired,
  handleButton: PropTypes.func.isRequired,
  handleTimezoneChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  loading: PropTypes.bool,
};

export default MeetForm;
