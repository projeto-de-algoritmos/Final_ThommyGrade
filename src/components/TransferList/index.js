import * as React from "react";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";

import {
  buildNetwork,
  initOptions,
  select,
  deselect,
} from "../../services/algorithms";

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

export function TransferList({ setFinalOptions }) {
  const [network, setNetwork] = React.useState(null);
  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState([]);
  const [right, setRight] = React.useState([]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleAllRight = () => {
    let update = {
      left,
      right,
    };

    left.forEach((subject) => {
      update = select(subject, update.left, update.right, network);
    });

    setLeft(update.left);
    setRight(update.right);
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedRight = () => {
    let update = {
      left,
      right,
    };

    leftChecked.forEach((subject) => {
      update = select(subject, update.left, update.right, network);
    });

    setLeft(update.left);
    setRight(update.right);
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    let update = {
      left,
      right,
    };

    rightChecked.forEach((subject) => {
      update = deselect(subject, update.right, update.left, network);
    });

    setLeft(update.left);
    setRight(update.right);
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    let update = {
      left,
      right,
    };

    right.forEach((subject) => {
      update = deselect(subject, update.right, update.left, network);
    });

    setLeft(update.left);
    setRight(update.right);
    setChecked(not(checked, rightChecked));
  };

  React.useEffect(() => {
    async function build() {
      const newNetwork = await buildNetwork({});
      setNetwork(newNetwork);
    }

    build();
  }, []);

  React.useEffect(() => {
    const initOpts = initOptions(network);

    const updatedLeft = initOpts.reduce((prev, code) => {
      return [...prev, code];
    }, []);

    setLeft(updatedLeft);
  }, [network]);

  React.useEffect(() => {
    setFinalOptions(left);
  }, [left, setFinalOptions]);

  const customList = (items) => (
    <Paper sx={{ width: 400, height: 350, overflow: "auto", marginBottom: "2rem" }}>
      <List dense component="div" role="list">
        {items.map((subject) => {
          const labelId = `transfer-list-item-${subject}-label`;

          return (
            <ListItem
              key={subject}
              role="listitem"
              button
              onClick={handleToggle(subject)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(subject) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    "aria-labelledby": labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`${network[subject].name}`} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Paper>
  );

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item>
        <p>Ainda não Cursei</p>
        {customList(left)}
      </Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleAllRight}
            disabled={left.length === 0}
            aria-label="move all right"
          >
            ≫
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleAllLeft}
            disabled={right.length === 0}
            aria-label="move all left"
          >
            ≪
          </Button>
        </Grid>
      </Grid>
      <Grid item>
        <p>Já Cursei</p>
        {customList(right)}
      </Grid>
    </Grid>
  );
}
