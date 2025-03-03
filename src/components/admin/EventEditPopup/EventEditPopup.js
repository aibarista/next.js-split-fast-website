import React, { useEffect, useState } from 'react';
import styles from './EventEditPopup.module.css';
import PropTypes from 'prop-types';
import BackIcon from 'assets/images/icon_arrow_right.svg';
import CloseIcon from 'assets/images/icon_close.svg';
import useEventForm from 'hooks/useEventForm';
import CustomSelect from 'components/common/CustomSelect';
import { EVENT_GENDER_OPTIONS } from 'constants';
import CustomButton, {
  defaultButtonStyle,
} from 'components/common/CustomButton';
import { getEventTypeLabel } from 'services/admin/MeetService';
import { ageGroupOptions as totalAgeGroupOptions } from 'config/admin/meet';
import { addEvent } from 'api/eventApi';
import { toast } from 'react-toastify';

const EventEditPopup = ({
  clubId,
  meet,
  event,
  mode,
  showPopup,
  closePopup,
  handleButton,
}) => {
  const [eventTypeOptions, setEventTypeOptions] = useState([]);
  const [ageGroupOptions, setAgeGroupOptions] = useState([]);
  const initialFormValues = {
    eventType: '',
    ageGroup: '',
    gender: '',
    roundType: '',
  };

  const {
    formValues,
    setFormValues,
    errors,
    setErrors,
    validateForm,
    handleInputChange,
    loading,
    setLoading,
  } = useEventForm(initialFormValues);

  const roundTypeOptions = [
    { value: 'Heat', label: 'Heat' },
    { value: 'Semi', label: 'Semi' },
    { value: 'Final', label: 'Final' },
    { value: 'Training', label: 'Training' },
  ];

  useEffect(() => {
    if (meet) {
      const eventTypeOptions = getEventTypeLabel(meet.eventTypes, true, true);
      setEventTypeOptions(
        eventTypeOptions.map((option) => {
          return {
            ...option,
            value: option.label,
          }; // TODO - refactoring to use the value with label
        })
      );
      setAgeGroupOptions(
        totalAgeGroupOptions
          .filter((option) => {
            return meet.ageGroups.includes(+option.value);
          })
          .map((option) => {
            return {
              ...option,
              value: option.label,
            }; // TODO - refactoring to use the value with label
          })
      );
    }
    if (event) {
      setFormValues(event);
    } else {
      setFormValues({
        eventType: '',
        ageGroup: '',
        gender: '',
        roundType: '',
      });
    }
  }, [meet, event, setFormValues]);

  const handleSave = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    const payload = {
      clubId,
      meetId: meet.meetID,
      publishingStatus: 'AdminOnly',
      ...formValues,
    };
    try {
      if (mode === 'add') {
        await addEvent(payload);
        toast.success('Event created successfully');
      } else {
        // TODO - confirm event edit function and implement it
        toast.success('Event edited successfully');
      }
      setLoading(false);
      handleButton();
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data);
      setLoading(false);
    }
  };

  return (
    <div
      className={`${styles.resultEditPopupOverlay} ${
        showPopup ? styles.active : ''
      }`}
    >
      <div className={styles.resultEditPopup}>
        <div className={styles.resultEditPopupContainer}>
          <div className={styles.title}>Add Event</div>
          <div className={styles.form}>
            <CustomSelect
              label="Event Type"
              options={eventTypeOptions}
              value={formValues.eventType}
              onChange={handleInputChange}
              error={errors.eventType}
              name="eventType"
            />
            <CustomSelect
              label="Gender"
              value={formValues.gender}
              onChange={handleInputChange}
              name="gender"
              options={EVENT_GENDER_OPTIONS}
              error={errors.gender}
            />
            <CustomSelect
              label="Age Group"
              value={formValues.ageGroup}
              onChange={handleInputChange}
              name="ageGroup"
              options={ageGroupOptions}
              error={errors.ageGroup}
            />
            <CustomSelect
              label="Round Type"
              value={formValues.roundType}
              onChange={handleInputChange}
              name="roundType"
              options={roundTypeOptions}
              error={errors.roundType}
            />
            <CustomButton
              style={{
                ...defaultButtonStyle,
                maxWidth: 279,
                margin: 'auto',
              }}
              onClick={() => handleSave()}
              disabled={loading}
            >
              Save
            </CustomButton>
          </div>
          <div
            className={styles.goBack}
            onClick={() => {
              closePopup();
            }}
          >
            <div className={styles.goBackImage}>
              <img src={BackIcon} alt="back" />
            </div>
            <div className={styles.goBackText}>Back</div>
          </div>
        </div>
        <div
          className={styles.closeBtn}
          onClick={() => {
            closePopup();
          }}
        >
          <img src={CloseIcon} alt="close" />
        </div>
      </div>
    </div>
  );
};

EventEditPopup.propTypes = {
  clubId: PropTypes.string,
  meet: PropTypes.object,
  event: PropTypes.object,
  showPopup: PropTypes.bool,
  closePopup: PropTypes.func,
  handleButton: PropTypes.func,
  mode: PropTypes.string,
};

export default EventEditPopup;
