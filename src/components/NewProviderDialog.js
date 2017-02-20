import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import DialogInput from './DialogInput';

import * as Actions from '../actions';


const NewProviderDialog = ({ list, actions }) => {
  const closeAddProvider = () => {
    actions.closeAddPopover();
    actions.clearNewProvider();
  };

  const addProvider = () => {
    actions.addNewProvider();
    closeAddProvider();
    actions.search(list.searchQuery);
    actions.sort(list.sorting);
  };

  const completedInfo =
    list.newProvider.last_name &&
    list.newProvider.first_name &&
    list.newProvider.email_address &&
    list.newProvider.email_address.match(/^\w+@\w+(\.\w+)$/ig);

  const dialogActions = [
    <FlatButton
      label="Cancel"
      onTouchTap={closeAddProvider}
    />,
    <FlatButton
      label="Add"
      primary
      keyboardFocused
      disabled={!completedInfo}
      onTouchTap={addProvider}
    />,
  ];

  return (
    <Dialog
      title="Add New Provider"
      actions={dialogActions}
      modal={false}
      open={list.addPopover}
      onRequestClose={closeAddProvider}
    >
      {list.details.map(header =>
        <DialogInput
          key={header}
          att={header}
        />,
      )}
    </Dialog>
  );
};


const mapStateToProps = state => ({
  ...state,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewProviderDialog);

