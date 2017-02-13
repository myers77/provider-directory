import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
}
from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';

import * as Actions from '../actions';

const iconStyle = {
  fontSize: 18,
  margin: 6,
};

const sortingHeaderStyle = {
  fontWeight: 500,
};

const List = ({ list, actions }) => {

  const titleCase = (input) => {
    input = input.replace(/_/, ' ');
    input = input.replace(/\b[a-z](?=[a-z]{2})/g,
      letter => letter.toUpperCase());
    return input;
  };

  const handleOnClickHeader = (e, rowIndex, colIndex) => {
    if (colIndex > 0) {
      if (list.details[colIndex - 1] === list.sorting) {
        actions.reverse();
      } else {
        actions.sort(list.details[colIndex - 1]);
      }
    }
  };

  return (
    <Paper zDepth={1}>
      <Table multiSelectable>

        <TableHeader displaySelectAll={false}>
          <TableRow onCellClick={handleOnClickHeader}>
            {list.details.map((header, index) =>
              <TableHeaderColumn key={header}>
                {titleCase(header)}
              </TableHeaderColumn>
            )}
          </TableRow>
        </TableHeader>

        <TableBody showRowHover>
          {list.data.map((d, rowIndex) =>
            <TableRow key={d.email_address}>
              {list.details.map((detail, colIndex) =>
                <TableRowColumn key={colIndex}>
                  {d[detail]}
                </TableRowColumn>
              )}
            </TableRow>
          )}
        </TableBody>

      </Table>
    </Paper>
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
)(List);
