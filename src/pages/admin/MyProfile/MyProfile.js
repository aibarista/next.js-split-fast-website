import React from 'react';
import styles from './MyProfile.module.css';

import NameInputBox from 'components/common/NameInputBox';
import CustomTextarea from 'components/common/CustomTextarea';
import CustomInput from 'components/common/CustomInput/CustomInput';
import CustomDatePicker from 'components/common/CustomDatePicker';
import CustomSelect from 'components/common/CustomSelect';
import AvatarPicker from 'components/common/AvatarPicker';
import CustomButton, {
  defaultButtonStyle,
} from 'components/common/CustomButton';
import CustomTag from 'components/common/CustomTag';
import ProfileContact from 'components/admin/ProfileContact';

import { GENDER_OPTIONS } from 'constants';

const addressTypeOptions = [
  { value: 'Suburb', label: 'Suburb' },
  { value: 'Town', label: 'Town' },
  { value: 'Locality', label: 'Locality' },
];

const stateOptions = [
  { value: 'NE', label: 'NE' },
  { value: 'DE', label: 'DE' },
];

const MyProfile = () => {
  return (
    <div className={styles.main}>
      <div className={styles.mainWrapper}>
        <div className={styles.leftPart}>
          <div className={styles.sectionTitle}>My Profile</div>
          <div className={styles.athleteNumber}>
            Athlete Number: <span>#01234</span>
          </div>
          <div className={styles.sectionSubtitle}>General</div>
          <NameInputBox
            labelStyle={{ color: '#313131' }}
            style={{ marginBottom: 24 }}
          />
          <CustomTextarea
            label="Bio"
            name="bio"
            placeholder="Describe yourself in a couple of sentences"
            maxLength={250}
            style={{
              marginBottom: 20,
            }}
          />
          <CustomInput
            label="Email Address"
            name="email"
            placeholder="a.morales.turbo.tt@gmail.com"
          />
          <CustomInput
            label="Contact Phone"
            name="phone"
            placeholder="[number]"
          />
          <CustomDatePicker label="Date of Birth" name="birthday" />
          <CustomSelect label="Gender" name="gender" options={GENDER_OPTIONS} />
          <CustomSelect
            label="Age Group"
            name="ageGroup"
            options={GENDER_OPTIONS}
          />
          <CustomTag />
          <div className={`${styles.sectionSubtitle} ${styles.address}`}>
            Address
          </div>
          <CustomInput
            label="Street Address"
            name="address"
            placeholder="Street Address"
          />
          <CustomSelect
            label="Suburb / Town / Locality"
            name="city"
            options={addressTypeOptions}
          />
          <CustomSelect
            label="State / Territory"
            name="state"
            options={stateOptions}
          />
          <CustomInput
            label="Postcode"
            name="postcode"
            placeholder="e.g. xxxxx"
            inputStyle={{
              maxWidth: '175px',
            }}
          />
        </div>
        <div className={styles.rightPart}>
          <div className={styles.buttonContainer}>
            <CustomButton
              style={{
                ...defaultButtonStyle,
                color: '#cf2c47',
                backgroundColor: 'transparent',
                marginBottom: 0,
                fontWeight: 600,
                padding: '12px 48px',
                height: 'unset',
              }}
            >
              Preview Profile
            </CustomButton>
            <CustomButton
              disabled={true}
              style={{
                ...defaultButtonStyle,
                fontSize: 14,
                padding: '12px 55px',
                borderRadius: 5,
                marginBottom: 0,
                height: 'unset',
              }}
            >
              Save Changes
            </CustomButton>
          </div>
          <AvatarPicker />
        </div>
      </div>
      <ProfileContact />
    </div>
  );
};

export default MyProfile;
