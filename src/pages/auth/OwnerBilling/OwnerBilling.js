import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import styles from './OwnerBilling.module.css';
import routes from 'routes';
import { authInfoUpdate } from 'services/auth/authSlice';
// import { ONBOARDING } from 'constants';

import BackButton from 'components/auth/BackButton';
// import Onboarding from 'components/auth/Onboarding';
import CustomButton from 'components/common/CustomButton';
import CustomInput from 'components/common/CustomInput/CustomInput';
import CustomSelect from 'components/common/CustomSelect';
import { createSubscriptionAccount } from 'api/authApi';
import { toast } from 'react-toastify';

const addressTypeOptions = [
  { value: 'Suburb', label: 'Suburb' },
  { value: 'Town', label: 'Town' },
  { value: 'Locality', label: 'Locality' },
];

const stateOptions = [
  { value: 'NE', label: 'NE' },
  { value: 'DE', label: 'DE' },
];

const OwnerBill = () => {
  const navigate = useNavigate();

  const { authInfo } = useSelector((state) => state.auth || {});
  const dispatch = useDispatch();

  // const onboardingInfo = ONBOARDING.OWNER;

  const [loading, setLoading] = useState(false);
  // const [showOnboarding, setShowOnboarding] = useState(false);
  // const [showLastOnboarding, setShowLastOnboarding] = useState(false);
  // const [selectedOnboardingStep, setSelectedOnboardingStep] = useState(0);
  const [formValues, setFormValues] = useState({
    address: '',
    city: '',
    state: '',
    postcode: '',
  });
  const [errors, setErrors] = useState({});

  // const nextOnboardingStep = () => {
  //   if (selectedOnboardingStep < onboardingInfo.length - 1) {
  //     setSelectedOnboardingStep(selectedOnboardingStep + 1);
  //   } else {
  //     setShowLastOnboarding(true);
  //   }
  // };

  // const goToSetupClub = () => {
  //   navigate(routes.auth.setupClub);
  // };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formValues.address) newErrors.address = 'Street Address is required';
    if (!formValues.city) newErrors.city = 'Address Type not Selected';
    if (!formValues.state) newErrors.state = 'State not Selected';
    if (!formValues.postcode) newErrors.postcode = 'Postcode is required';

    return newErrors;
  };

  const clickNextButton = async () => {
    try {
      setLoading(true);
      const validationErrors = validateForm();

      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
      } else {
        dispatch(
          authInfoUpdate({
            ...authInfo,
            billingAddress: `${formValues.address}, ${formValues.city}, ${formValues.state} ${formValues.postcode}`,
          })
        );

        await createSubscriptionAccount({
          ...authInfo,
          subscriptionLevel: authInfo.subscriptionLevel.toString(),
          billingAddress: `${formValues.address}, ${formValues.city}, ${formValues.state} ${formValues.postcode}`,
        });

        setLoading(false);
        navigate(routes.auth.verifyEmail);
      }
    } catch (err) {
      console.log(err.message);
      toast.error(err.message);
      setLoading(false);
    }
  };

  return (
    <>
      <BackButton navigate={navigate} />
      <div className={styles.formContainer}>
        <div className={styles.sectionHeading}>Billing Details</div>
        <div className={styles.inputItems}>
          <CustomInput
            label="Street Address"
            name="address"
            placeholder="Street Address"
            onChange={handleInputChange}
            error={errors.address}
          />
          <CustomSelect
            label="Suburb / Town / Locality"
            name="city"
            onChange={handleInputChange}
            error={errors.city}
            value={formValues.city}
            options={addressTypeOptions}
          />
          <CustomSelect
            label="State / Territory"
            name="state"
            onChange={handleInputChange}
            error={errors.state}
            value={formValues.state}
            options={stateOptions}
          />
          <CustomInput
            label="Postcode"
            name="postcode"
            placeholder="e.g. xxxxx"
            onChange={handleInputChange}
            error={errors.postcode}
            inputStyle={{
              maxWidth: '175px',
            }}
          />
        </div>
        <div className={styles.paymentMethods}>
          Which payment methods will we offer?
        </div>
        <CustomButton onClick={clickNextButton} disabled={loading}>
          Next
        </CustomButton>
        {/*{showOnboarding && (*/}
        {/*  <Onboarding*/}
        {/*    onboardingInfo={onboardingInfo}*/}
        {/*    selectedOnboardingStep={selectedOnboardingStep}*/}
        {/*    nextStep={nextOnboardingStep}*/}
        {/*    showLastOnboarding={showLastOnboarding}*/}
        {/*    setShowLastOnboarding={setShowLastOnboarding}*/}
        {/*    finishOnboarding={() => goToSetupClub()}*/}
        {/*  />*/}
        {/*)}*/}
      </div>
    </>
  );
};

export default OwnerBill;
