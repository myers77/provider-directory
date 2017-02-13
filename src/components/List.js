import React from 'react';
import { connect } from 'react-redux';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
}
from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';

const iconStyle = {
    fontSize: 18,
    margin: 6,
}

const headerStyle = {
  fontWeight: 500,
}

const logClick = e => {

}

const List = ({ data, headers }) => {

  const titleCase = input => {
    input = input.replace(/_/, ' ');
    input = input.replace(/\b[a-z](?=[a-z]{2})/g,
      letter => letter.toUpperCase());
    return input;
  }

  return (
    <Paper zDepth={1}>
      <Table>
        <TableHeader
          displaySelectAll={false}
        >
          <TableRow>
            {headers.map((header, index) => 
              <TableHeaderColumn key={index}>
                {titleCase(header)}
              </TableHeaderColumn>
            )}
          </TableRow>
        </TableHeader>
          <TableBody
            showRowHover={true}
          >
          {data.map((d, index) =>
            <TableRow key={index}>
              {headers.map((header, index) => 
                <TableRowColumn key={index}>
                  {d[header]}
                </TableRowColumn>
             )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Paper>
  );
}

const mapStateToProps = state => ({
  ...state,
});

export default connect(
  mapStateToProps,
)(List);
