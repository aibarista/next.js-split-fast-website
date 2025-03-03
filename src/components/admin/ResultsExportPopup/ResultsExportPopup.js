import React from 'react';
import PropTypes from 'prop-types';
import styles from './ResultsExportPopup.module.css';
import CloseIcon from 'assets/images/icon_close.svg';
import BackIcon from 'assets/images/icon_arrow_right.svg';
import Loading from 'components/common/Loading';
import CustomButton, {
  defaultButtonStyle,
} from 'components/common/CustomButton';
import { exportColumns } from 'config/admin/event';
import AdminDataTable from 'components/admin/AdminDataTable';
import CustomSelect from 'components/common/CustomSelect';
import { CSV_FORMAT_OPTIONS } from 'constants';

const ResultExportPopup = ({
  showPopup,
  onClose,
  loading,
  handleButton,
  handleCheckBoxValueChange,
  events,
  csvFormat,
  setCsvFormat,
}) => {
  return events.length > 0 ? (
    <div className={`${styles.popupOverlay} ${showPopup ? styles.active : ''}`}>
      <div className={styles.popup}>
        <div className={styles.popupContainer}>
          {loading ? (
            <Loading />
          ) : (
            <>
              <div className={styles.title}>Export Results</div>
              <div className={styles.formatSelect}>
                <CustomSelect
                  label=""
                  value={csvFormat}
                  onChange={setCsvFormat}
                  name="format"
                  options={CSV_FORMAT_OPTIONS}
                />
              </div>
              <AdminDataTable
                columns={exportColumns}
                data={events}
                headStyle={{
                  gridTemplateColumns: '2fr 6fr 4fr 4fr 4fr 4fr',
                }}
                rowStyle={{
                  gridTemplateColumns: '2fr 6fr 4fr 4fr 4fr 4fr',
                }}
                handleCheckBoxValueChange={handleCheckBoxValueChange}
              />
              <CustomButton
                style={{
                  ...defaultButtonStyle,
                  maxWidth: 279,
                  margin: 'auto',
                }}
                onClick={handleButton}
                disabled={loading}
              >
                EXPORT
              </CustomButton>
            </>
          )}
        </div>
        <div className={styles.closeBtn} onClick={onClose}>
          <img src={CloseIcon} alt="close" />
        </div>
        <div className={styles.goBack} onClick={onClose}>
          <div className={styles.goBackImage}>
            <img src={BackIcon} alt="back" />
          </div>
          <div className={styles.goBackText}>Back</div>
        </div>
      </div>
    </div>
  ) : (
    <div>No event results</div>
  );
};

ResultExportPopup.propTypes = {
  showPopup: PropTypes.bool.isRequired,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  onClose: PropTypes.func,
  loading: PropTypes.bool.isRequired,
  handleButton: PropTypes.func,
  events: PropTypes.array,
  handleCheckBoxValueChange: PropTypes.array,
  csvFormat: PropTypes.string,
  setCsvFormat: PropTypes.func,
};

export default ResultExportPopup;
