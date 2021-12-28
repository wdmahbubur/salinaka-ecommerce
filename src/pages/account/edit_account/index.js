import { EditOutlined, LoadingOutlined } from '@ant-design/icons';
import Boundary from '../../../components/common/Boundary';
import ImageLoader from '../../../components/common/ImageLoader';
import { Form, Formik } from 'formik';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../../redux/actions/miscActions';
import { updateProfile } from '../../../redux/actions/profileActions';
import * as Yup from 'yup';
import ConfirmModal from './ConfirmModal';
import EditForm from './EditForm';

import useDocumentTitle from '../../../hooks/useDocumentTitle';
import useFileHandler from '../../../hooks/useFileHandler';
import useModal from '../../../hooks/useModal';
import useScrollTop from '../../../hooks/useScrollTop';
import useAuth from '../../../hooks/useAuth';
import defaultAvatar from '../../../images/defaultAvatar.jpg';
import defaultBanner from '../../../images/defaultBanner.jpg';
import axios from 'axios';

const FormSchema = Yup.object().shape({
  fullname: Yup.string()
    .min(4, 'Full name should be at least 4 characters.')
    .max(60, 'Full name should be only be 4 characters long.')
    .required('Full name is required'),
  email: Yup.string()
    .email('Email is not valid.')
    .required('Email is required.'),
  address: Yup.string(),
  mobile: Yup.object()
    .shape({
      country: Yup.string(),
      countryCode: Yup.string(),
      dialCode: Yup.string(),
      value: Yup.string()
    })
});

const EditProfile = () => {
  const { createAccount, user, success, loading, error, authProvider, updateUser } = useAuth()
  useDocumentTitle('Edit Account | Salinaka');
  useScrollTop();

  const modal = useModal();
  const dispatch = useDispatch();

  useEffect(() => () => {
    dispatch(setLoading(false));
  }, []);

  const { profile, auth, isLoading } = useSelector((state) => ({
    profile: state.profile,
    auth: state.auth,
    isLoading: state.app.loading
  }));

  const initFormikValues = {
    fullname: user.fullname || '',
    email: user.email || '',
    address: user.address || '',
    mobile: user.mobile || {}
  };

  const {
    imageFile,
    isFileLoading,
    onFileChange
  } = useFileHandler({ avatar: {}, banner: {} });

  const update = (form, credentials = {}) => {
    updateUser({
      updates: {
        fullname: form.fullname,
        email: form.email,
        address: form.address,
        mobile: form.mobile,
        avatar: user.avatar,
        banner: user.banner
      },
      files: {
        bannerFile: imageFile.banner.file,
        avatarFile: imageFile.avatar.file
      },
      credentials
    });
  };

  const onConfirmUpdate = (form, password) => {
    if (password) {
      update(form, { email: form.email, password });
    }
  };

  const onSubmitUpdate = (form) => {
    // check if data has changed
    const fieldsChanged = Object.keys(form).some((key) => user[key] !== form[key]);

    if (fieldsChanged || (Boolean(imageFile.banner.file || imageFile.avatar.file))) {
      if (form.email !== user.email) {
        modal.onOpenModal();
      } else {
        update(form);
      }
    }
  };

  return (
    <Boundary>
      <div className="edit-user">
        <h3 className="text-center">Edit Account Details</h3>
        <Formik
          initialValues={initFormikValues}
          validateOnChange
          validationSchema={FormSchema}
          onSubmit={onSubmitUpdate}
        >
          {() => (
            <Form>
              <div className="user-profile-banner">
                <div className="user-profile-banner-wrapper">
                  <ImageLoader
                    alt="Banner"
                    className="user-profile-banner-img"
                    src={
                      imageFile.banner.url ? imageFile.banner.url : user.banner === "defaultBanner" ? defaultBanner : user.banner
                    }
                  />
                  {isFileLoading ? (
                    <div className="loading-wrapper">
                      <LoadingOutlined />
                    </div>
                  ) : (
                    <label
                      className="edit-button edit-banner-button"
                      htmlFor="edit-banner"
                    >
                      <input
                        accept="image/x-png,image/jpeg"
                        disabled={isFileLoading}
                        hidden
                        id="edit-banner"
                        onChange={(e) => onFileChange(e, { name: 'banner', type: 'single' })}
                        type="file"
                      />
                      <EditOutlined />
                    </label>
                  )}
                </div>
                <div className="user-profile-avatar-wrapper">
                  <ImageLoader
                    alt="Avatar"
                    className="user-profile-img"
                    src={
                      imageFile.avatar.url ? imageFile.avatar.url : user.avatar === "defaultAvatar" ? defaultAvatar : user.avatar}
                  />
                  {isFileLoading ? (
                    <div className="loading-wrapper">
                      <LoadingOutlined />
                    </div>
                  ) : (
                    <label
                      className="edit-button edit-avatar-button"
                      htmlFor="edit-avatar"
                    >
                      <input
                        accept="image/png,image/jpeg"
                        disabled={isFileLoading}
                        hidden
                        id="edit-avatar"
                        onChange={(e) => onFileChange(e, { name: 'avatar', type: 'single' })}
                        type="file"
                      />
                      <EditOutlined />
                    </label>
                  )}
                </div>
              </div>
              <EditForm
                authProvider={authProvider}
                isLoading={isFileLoading}
              />
              <ConfirmModal
                onConfirmUpdate={onConfirmUpdate}
                modal={modal}
              />
            </Form>
          )}
        </Formik>
      </div>
    </Boundary>
  );
};

export default EditProfile;
