import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TableHeaderColumn, TableRow } from 'material-ui/Table';
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
    actions.sort(list.sorting);
  };

  return (
    <TableRow {...otherProps}>
      {otherProps.children[0] /* checkbox passed down from Table-Header */}
      <TableHeaderColumn colSpan="2" style={{ textAlign: 'center' }}>
        <FontIcon
          className="material-icons"
          onClick={handleClickAdd}
          style={iconStyle}
        >
          add
        </FontIcon>
      </TableHeaderColumn>
      <TableHeaderColumn colSpan="2" style={{ textAlign: 'center' }}>
        <FontIcon className="material-icons">
          search
        </FontIcon>
        <TextField
          hintText="search"
          onChange={handleSearchFieldChange}
        /><br />
      </TableHeaderColumn>
      <TableHeaderColumn colSpan="1">
        <FontIcon
          className="material-icons"
          onClick={handleClickDelete}
          style={iconStyle}
        >
          delete
        </FontIcon>
      </TableHeaderColumn>
    </TableRow>
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
