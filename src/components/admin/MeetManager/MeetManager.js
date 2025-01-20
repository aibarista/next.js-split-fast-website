import React, { useEffect, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import layoutStyles from 'layouts/FormWithFooterLayout/FormWithFooterLayout.module.css';

import routes from 'routes';
import { createMeet, getMeetById, updateMeet } from 'api/clubApi';
import useMeetForm from 'hooks/useMeetForm';
import { getMeetFormData, getMeetRequest } from 'services/admin/MeetService';

import MeetForm from 'components/admin/MeetForm';
import Loading from 'components/common/Loading';

const MeetManager = ({ mode, clubId, meetId }) => {
  const navigate = useNavigate();
  const [fetchingMeet, setFetchingMeet] = useState(true);

  const initialFormValues = {
    meetName: '',
    date: '',
    time: '',
    timezone: { id: 'UTC', displayName: 'UTC' },
    description: '',
    meetType: mode === 'edit' ? 1 : '',
    location: '',
    ageGroups: [],
    multiLaneEvents: [],
    hurdleEvents: [],
    relayEvents: [],
    groupDistanceEvents: [],
    walkEvents: [],
    sprintAgilityTraining: [],
    fieldEvents: [],
    meetStatus: '',
  };

  const {
    formValues,
    setFormValues,
    errors,
    setErrors,
    validateForm,
    handleInputChange,
    handleRadioChange,
    handleTimeChange,
    handleTimezoneChange,
    loading,
    setLoading,
  } = useMeetForm(initialFormValues);

  const fetchMeet = useCallback(async () => {
    if (mode === 'edit') {
      try {
        const response = await getMeetById(clubId, meetId);
        const meet = response.data;
        setFormValues(getMeetFormData(meet));
      } catch (err) {
        if (err.status === 404) {
          navigate(routes.notFound);
        } else {
          toast.error(err.message);
          navigate(routes.admin.dashboard);
        }
      }
    }
  }, [mode, clubId, meetId, setFormValues, navigate]);

  useEffect(() => {
    if (mode === 'edit') fetchMeet().then(() => setFetchingMeet(false));
  }, [fetchMeet, mode]);

  const handleButton = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    const meetPayload = getMeetRequest(formValues);

    try {
      if (mode === 'add') {
        await createMeet({
          clubID: clubId,
          publishingAccess: 'AdminOnly',
          ...meetPayload,
        });
        toast.success('Meet created successfully');
      } else {
        await updateMeet(meetId, meetPayload);
        toast.success('Meet updated successfully');
      }
      navigate(routes.admin.meets);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {mode === 'edit' && fetchingMeet ? (
        <Loading />
      ) : (
        <div className={layoutStyles.formContainer}>
          <div className={layoutStyles.sectionHeading}>
            {mode === 'add' ? 'Add a' : 'Edit the'} <span>Meet</span>
          </div>
          <MeetForm
            formValues={formValues}
            handleButton={handleButton}
            handleInputChange={handleInputChange}
            handleRadioChange={handleRadioChange}
            handleTimeChange={handleTimeChange}
            handleTimezoneChange={handleTimezoneChange}
            errors={errors}
            loading={loading}
          />
        </div>
      )}
    </>
  );
};

MeetManager.propTypes = {
  mode: PropTypes.string,
  clubId: PropTypes.string,
  meetId: PropTypes.string,
};

export default MeetManager;
