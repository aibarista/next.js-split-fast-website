import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import layoutStyles from 'layouts/FormWithFooterLayout/FormWithFooterLayout.module.css';

import { addAthlete, getAthlete, updateAthlete } from 'api/userApi';
import useAthleteForm from 'hooks/useAthleteForm';
import routes from 'routes';
import {
  getAthleteFormData,
  getAthleteRequest,
} from 'services/admin/AthleteService';

import MetaTags from 'components/common/MetaTags';
import Loading from 'components/common/Loading';
import AthleteForm from 'components/admin/AthleteForm';

const AthleteManager = ({ mode, id, email, athleteId }) => {
  const navigate = useNavigate();
  const [fetchingAthlete, setFetchingAthlete] = useState(true);

  const initialFormValues = {
    firstName: '',
    lastName: '',
    gender: '',
    competingAge: '',
    birthday: '',
    participationStatus: 'YES',
    clubAthleteNumber: null,
  };

  const {
    formValues,
    setFormValues,
    errors,
    setErrors,
    loading,
    setLoading,
    fetchingMember,
    member,
    competingAgeOptions,
    validateForm,
    handleInputChange,
  } = useAthleteForm(initialFormValues, id, email);

  const fetchAthlete = useCallback(async () => {
    if (mode === 'edit') {
      try {
        const response = await getAthlete(id, athleteId);
        setFormValues(getAthleteFormData(response.data));
      } catch (err) {
        console.log('[AthleteManager] Fetch athlete error: ', err);
        if (err.status === 404) {
          navigate(routes.notFound);
        } else {
          toast.error(err.message);
          navigate(routes.admin.dashboard);
        }
      }
    }
  }, [athleteId, id, mode, navigate, setFormValues]);

  useEffect(() => {
    if (mode === 'edit') fetchAthlete().then(() => setFetchingAthlete(false));
  }, [fetchAthlete, mode]);

  const handleButton = async () => {
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setLoading(true);
      const athletePayload = getAthleteRequest(formValues);
      try {
        if (mode === 'add') {
          await addAthlete({
            clubID: id,
            memberEmail: email,
            ...athletePayload,
          });
          toast.success('Athlete added successfully');
        } else {
          await updateAthlete(id, athleteId, athletePayload);
          toast.success('Athlete updated successfully');
        }
        navigate(routes.admin.showMember.url(id, email));
      } catch (err) {
        console.log(err);
        toast.error(err.response.data);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <MetaTags
        title={`SplitFast | ${mode === 'add' ? 'Add' : 'Edit'} Athlete`}
      />
      {fetchingMember || (mode === 'edit' && fetchingAthlete) ? (
        <Loading />
      ) : (
        <div className={layoutStyles.formContainer}>
          <div className={layoutStyles.sectionHeading}>
            {mode === 'add' ? 'Add an' : 'Edit'} <span>athlete profile</span>
          </div>
          <AthleteForm
            memberName={`${member.firstName} ${member.lastName}`}
            formValues={formValues}
            competingAgeOptions={competingAgeOptions}
            handleButton={handleButton}
            loading={loading}
            errors={errors}
            buttonLabel={mode === 'add' ? 'Create Athlete' : 'Save Changes'}
            handleInputChange={handleInputChange}
          />
        </div>
      )}
    </>
  );
};

AthleteManager.propTypes = {
  mode: PropTypes.string,
  id: PropTypes.string,
  email: PropTypes.string,
  athleteId: PropTypes.string,
};

export default AthleteManager;
