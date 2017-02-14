import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FontIcon from 'material-ui/FontIcon';
import TextField from 'material-ui/TextField';

import * as Actions from '../actions';

const iconStyle = {
  cursor: 'pointer',
};

const ListHeaderActionsRow = ({ ...otherProps, list, actions }) => {
  const handleSearchFieldChange = (e, newValue) => {
    actions.search(newValue);
    actions.sort(list.sorting);
  };

  const handleClickAdd = () => {
    actions.toggleShowAddRow();
  };

  const handleClickDelete = () => {
    actions.deleteSelectedEntries(list.selectedEntries, list.data);
    actions.search(list.searchQuery);
    actions.sort(list.sorting);
  };

  return (
    <tr>
      <th colSpan="2" style={{ textAlign: 'center' }}>
        <FontIcon
          className="material-icons"
          onClick={handleClickAdd}
          style={iconStyle}
        >
          add
        </FontIcon>
      </th>
      <th colSpan="2" style={{ textAlign: 'center' }}>
        <FontIcon className="material-icons">
          search
        </FontIcon>
        <TextField
          hintText="search"
          onChange={handleSearchFieldChange}
        /><br />
      </th>
      <th colSpan="1">
        <FontIcon
          className="material-icons"
          onClick={handleClickDelete}
          style={iconStyle}
        >
          delete
        </FontIcon>
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
