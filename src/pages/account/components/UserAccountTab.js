/* eslint-disable indent */
import ImageLoader from '../../../components/common/ImageLoader';
// import { ACCOUNT_EDIT } from 'constants/routes';
import { displayDate } from '../../../helpers/utils';
import PropType from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import defaultAvatar from '../../../images/defaultAvatar.jpg';
import defaultBanner from '../../../images/defaultBanner.jpg';
const UserProfile = (props) => {
  const { fullname, email, address, mobile, avatar, banner, createdAt } = props.user;

  return (
    <div className="user-profile">
      <div className="user-profile-block">
        <div className="user-profile-banner">
          <div className="user-profile-banner-wrapper">
            <ImageLoader
              alt="Banner"
              className="user-profile-banner-img"
              src={
                banner === "defaultBanner" ? defaultBanner : banner
              }
            />
          </div>
          <div className="user-profile-avatar-wrapper">
            <ImageLoader
              alt="Avatar"
              className="user-profile-img"
              src={
                avatar === "defaultAvatar" ? defaultAvatar : avatar
              }
            />
          </div>
          <button
            className="button button-small user-profile-edit"
            onClick={() => props.history.push("/edit")}
            type="button"
          >
            Edit Account
          </button>
        </div>
        <div className="user-profile-details">
          <h2 className="user-profile-name">{fullname}</h2>
          <span>Email</span>
          <br />
          <h5>{email}</h5>
          <span>Address</span>
          <br />
          {address ? (
            <h5>{address}</h5>
          ) : (
            <h5 className="text-subtle text-italic">Address not set</h5>
          )}
          <span>Mobile</span>
          <br />
          {mobile ? (
            <h5>{mobile.value}</h5>
          ) : (
            <h5 className="text-subtle text-italic">Mobile not set</h5>
          )}
          <span>Date Joined</span>
          <br />
          {createdAt ? (
            <h5>{displayDate(createdAt)}</h5>
          ) : (
            <h5 className="text-subtle text-italic">Not available</h5>
          )}
        </div>
      </div>
    </div>
  );
};

UserProfile.propTypes = {
  history: PropType.shape({
    push: PropType.func
  }).isRequired
};

export default withRouter(UserProfile);
