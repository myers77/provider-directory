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
import NewProviderDialog from './NewProviderDialog';

const iconStyle = {
  color: '#fff',
};

const buttonStyle = {
  verticalAlign: 'middle',
  color: '#fff',
  padding: 12,
};

const rowStyle = {
  backgroundColor: cyan500,
};

const ListHeaderActionsRow = ({ list, actions }) => {
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

  const handleDialogFieldChange = (e, newValue) => {
    actions.updateNewProvider(e.target.name, newValue)
  }

  const newIconClass =
  classNames({
    'material-icons': true,
    enabledIcon: !isEmpty(list.selectedEntries),
    disabledIcon: isEmpty(list.selectedEntries),
  });

  return (
    <tr style={rowStyle}>
      <th colSpan="5" style={{ textAlign: 'left' }}>
          <FontIcon
            className="material-icons"
            style={buttonStyle}
            color={'white'}
          >
            search
          </FontIcon>
        <TextField
          className="search-field"
          hintText="search"
          onChange={handleSearchFieldChange}
        /><br />
      </th>

      <th colSpan="1" style={{ textAlign: 'right' }}>
        <IconButton
          style={buttonStyle}
          onClick={handleClickAdd}
        >
          <FontIcon
            className="material-icons"
            style={iconStyle}
            color={'white'}
          >
            add
          </FontIcon>
        </IconButton>
        <NewProviderDialog />

        <IconButton
          disabled={isEmpty(list.selectedEntries)}
          style={buttonStyle}
          onClick={handleClickDelete}
        >
          <FontIcon
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
