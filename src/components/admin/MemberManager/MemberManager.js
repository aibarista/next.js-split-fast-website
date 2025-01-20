import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import layoutStyles from 'layouts/FormWithFooterLayout/FormWithFooterLayout.module.css';

import {
  createClubMember,
  getClubMemberByEmail,
  updateMember,
} from 'api/userApi';
import useMemberForm from 'hooks/useMemberForm';
import routes from 'routes';

import MemberForm from 'components/admin/MemberForm';
import Loading from 'components/common/Loading';

const MemberManager = ({ mode, id, email }) => {
  const navigate = useNavigate();
  const [fetchingMember, setFetchingMember] = useState(true);

  const initialFormValues = {
    firstName: '',
    lastName: '',
    email: '',
    role: 'Member',
    sendInvitation: mode === 'add' ? false : null,
    participationStatus: '',
  };

  const {
    formValues,
    setFormValues,
    errors,
    setErrors,
    loading,
    setLoading,
    validateForm,
    handleInputChange,
    handleCheckboxChange,
    handleRadioChange,
  } = useMemberForm(initialFormValues);

  const fetchMember = useCallback(async () => {
    if (mode === 'edit') {
      try {
        const response = await getClubMemberByEmail(id, email);
        setFormValues(response.data);
      } catch (err) {
        console.log('[MemberManager] Fetch member error: ', err);
        if (err.status === 404) {
          navigate(routes.notFound);
        } else {
          toast.error(err.message);
          navigate(routes.admin.dashboard);
        }
      }
    }
  }, [mode, id, email, navigate, setFormValues]);

  useEffect(() => {
    if (mode === 'edit')
      fetchMember().then(() => {
        setFetchingMember(false);
      });
  }, [fetchMember, mode]);

  const handleButton = async () => {
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setLoading(true);
      try {
        if (mode === 'add') {
          await createClubMember({
            clubID: id,
            email: formValues.email,
            firstName: formValues.firstName,
            lastName: formValues.lastName,
            role: formValues.role,
            participationStatus: formValues.participationStatus,
            sendInvitation: formValues.sendInvitation,
          });
          toast.success('Member created successfully');
        } else {
          await updateMember(id, email, {
            email: formValues.email,
            firstName: formValues.firstName,
            lastName: formValues.lastName,
            role: formValues.role,
            participationStatus: formValues.participationStatus,
          });
          toast.success('Member updated successfully');
        }
        navigate(routes.admin.members);
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
      {mode === 'edit' && fetchingMember ? (
        <Loading />
      ) : (
        <div className={layoutStyles.formContainer}>
          <div className={layoutStyles.sectionHeading}>
            {mode === 'add' ? 'Add a' : 'Edit the'} <span>member</span>
          </div>
          <MemberForm
            type={mode}
            formValues={formValues}
            loading={loading}
            errors={errors}
            handleButton={handleButton}
            handleRadioChange={handleRadioChange}
            handleInputChange={handleInputChange}
            handleCheckboxChange={handleCheckboxChange}
          />
        </div>
      )}
    </>
  );
};

MemberManager.propTypes = {
  mode: PropTypes.string.isRequired,
  id: PropTypes.string,
  email: PropTypes.string,
};

export default MemberManager;
