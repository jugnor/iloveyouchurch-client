import {GridApiRef, GridToolbarContainer} from "@mui/x-data-grid-pro";
import {randomId} from "@mui/x-data-grid-generator";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import * as React from "react";
import {JSXElementConstructor} from "react";

interface EditToolbarProps {
  apiRef: GridApiRef;
}

export function EditToolbar(props: EditToolbarProps,currentField:string) {
  const {apiRef} = props;

  const handleClick = () => {
    const id = randomId();
    apiRef.current.updateRows([{id, isNew: true}]);
    apiRef.current.setRowMode(id, 'edit');
    // Wait for the grid to render with the new row
    setTimeout(() => {
      apiRef.current.scrollToIndexes({
        rowIndex: apiRef.current.getRowsCount() - 1,
      });
      apiRef.current.setCellFocus(id, currentField);
    });
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon/>} onClick={handleClick}>
        Neues Item Hinzufügen
      </Button>
    </GridToolbarContainer>
  );
}
