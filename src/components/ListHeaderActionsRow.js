import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { isEmpty } from 'ramda';
import classNames from 'classnames';

import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import { cyan500 } from 'material-ui/styles/colors';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';

import * as Actions from '../actions';
import './icons.css';

const iconStyle = {
  color: '#fff',
};

const buttonStyle = {
  verticalAlign: 'middle',
};

const rowStyle = {
  backgroundColor: cyan500,
};

const ListHeaderActionsRow = ({ ...otherProps, list, actions }) => {
  const handleSearchFieldChange = (e, newValue) => {
    actions.search(newValue);
    actions.sort(list.sorting);
  };

  const handleClickAdd = () => {
    actions.openAddPopover();
  };

  const handleClickDelete = () => {
    actions.deleteSelectedEntries(list.selectedEntries, list.data);
    actions.search(list.searchQuery);
    actions.sort(list.sorting);
  };

  const handleCloseDialog = () => {
    console.log('closed');
  };

  const newIconClass =
  classNames({
    'material-icons': true,
    'enabledIcon': !isEmpty(list.selectedEntries),
    'disabledIcon': isEmpty(list.selectedEntries),
  });

  const dialogActions = [
    <FlatButton
      label="Cancel"
      primary={true}
    />,
    <FlatButton
      label="Submit"
      primary={true}
      keyboardFocused={true}
    />,
    ];

  return (
    <tr style={rowStyle}>
      <th colSpan="5" style={{ textAlign: 'left' }}>
        <IconButton style={buttonStyle}>
          <FontIcon
            className="material-icons"
            style={iconStyle}
            color={'white'}
          >
            search
          </FontIcon>
        </IconButton>
          <TextField
            className="search-field"
            hintText="search"
            onChange={handleSearchFieldChange}
          /><br />
        </th>

        <th colSpan="1" style={{ textAlign: 'right' }}>
        <IconButton style={buttonStyle}>
          <FontIcon
            className="material-icons"
            onClick={handleClickAdd}
            style={iconStyle}
            color={'white'}
          >
            add
          </FontIcon>
          <Dialog
            title="Add New Provider"
            actions={dialogActions}
            modal={false}
            open={list.addPopover}
            onRequestClose={handleCloseDialog}
          >
                <TextField hintText="First name" underlineShow={false} />
                <Divider />
                <TextField hintText="Middle name" underlineShow={false} />
                <Divider />
                <TextField hintText="Last name" underlineShow={false} />
                <Divider />
                <TextField hintText="Email address" underlineShow={false} />
                <Divider />
          </Dialog>

        </IconButton>

        <IconButton disabled={isEmpty(list.selectedEntries)} style={buttonStyle}>
          <FontIcon
            onClick={handleClickDelete}
            color={'white'}
            style={iconStyle}
            className={newIconClass}
          >
            delete
          </FontIcon>
        </IconButton>

      </th>
    </tr>
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
)(ListHeaderActionsRow);
