import React from 'react';
import PropTypes from 'prop-types';
import styles from './Onboarding.module.css';

const Onboarding = ({
  onboardingInfo,
  selectedOnboardingStep,
  nextStep,
  showLastOnboarding,
  setShowLastOnboarding,
  finishOnboarding,
}) => {
  const onboardingStepInfo = onboardingInfo[selectedOnboardingStep];

  return (
    <div className={styles.onboardingPopupOverlay}>
      <div className={styles.onboardingPopup}>
        <div className={styles.onboardingPopOverflow}>
          {showLastOnboarding ? (
            <>
              <div className={styles.onboardingImage}>Graphic here</div>
              <div className={styles.onboardingTitle}>
                Ready to get started?
              </div>
              <div className={styles.setClubBtn} onClick={finishOnboarding}>
                Set Up My Club
              </div>
            </>
          ) : (
            <>
              <div className={styles.onboardingImage}>Graphic here</div>
              <div className={styles.onboardingTitle}>
                {onboardingStepInfo.title}
              </div>
              <div className={styles.onboardingText}>
                {onboardingStepInfo.description}
              </div>
              <div className={styles.onboardingPaginates}>
                {onboardingInfo.map((item, index) => (
                  <div
                    key={index}
                    className={`${styles.onboardingPaginate} ${index === selectedOnboardingStep ? styles.onboardingPaginateActive : ''}`}
                  ></div>
                ))}
              </div>
            </>
          )}
        </div>
        {!showLastOnboarding && (
          <>
            <div
              className={styles.skipTourTae}
              onClick={() => setShowLastOnboarding(true)}
            >
              Skip Tour
            </div>
            <div className={styles.obNextBtn} onClick={nextStep}>
              Next
            </div>
          </>
        )}
      </div>
    </div>
  );
};

Onboarding.propTypes = {
  onboardingInfo: PropTypes.object,
  selectedOnboardingStep: PropTypes.number,
  nextStep: PropTypes.func,
  showLastOnboarding: PropTypes.bool,
  setShowLastOnboarding: PropTypes.func,
  finishOnboarding: PropTypes.func,
};

export default Onboarding;
