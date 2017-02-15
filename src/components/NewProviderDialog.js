import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import DialogInput from './DialogInput';

import * as Actions from '../actions';


const NewProviderDialog = ({list, actions }) => {
  const cancelAddProvider = () => {
    actions.closeAddPopover();
  };

  const addProvider = () => {
    actions.addProvider();
    actions.closeAddPopover();
  };

  const dialogActions = [
    <FlatButton
      label="Cancel"
      onTouchTap={cancelAddProvider}
    />,
    <FlatButton
      label="Add"
      primary
      keyboardFocused
      onTouchTap={addProvider}
    />,
  ];

  return (
    <Dialog
      title="Add New Provider"
      actions={dialogActions}
      modal={false}
      open={list.addPopover}
      onRequestClose={cancelAddProvider}
    >
      {list.details.map(header =>
        <DialogInput
          att={header}
        />
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

