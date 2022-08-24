import * as React from 'react';
import { useState, useEffect, useReducer } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { Divider } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { Typography } from '@mui/material';
import {TextareaAutosize} from '@mui/material';

export default function FormDialog() {
  // const history = useHistory
  const [open, setOpen] = React.useState(false);
  const [accountType, setAccountType] = React.useState('zameendar');

  const fetchHandler = async () => {
    return await axios.get('https://iqbalsons-api.herokuapp.com/accounts').then((res) => res.data)
  }
  const [reducerValue, forceUpdate] = useReducer(x => x + 1, 0)
  const [accounts, setAccounts] = useState([])
  useEffect(() => {
    fetchHandler().then((data) => setAccounts(data.accounts))
  }, [reducerValue])


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [formData, setFormData] = React.useState({
    name: '', fatherName: '', location: '', phone: '', description: '', guarantor: '', accountType: 'zameendar',
    accountTitle: '', accountNumber: ''
  })
  const [BankShow, setBankShow] = React.useState(true)
  const handleAccountTypeChange = (event, newAccountType) => {
    setAccountType(newAccountType);
    setFormData({ ...formData, ["accountType"]: newAccountType })
    if (event.target.value == "bank") {
      setBankShow(false);
    }
    if (event.target.value != "bank") {
      setBankShow(true);
    }
  };

  const handleInsert = async (e) => {

    e.preventDefault();
    const { name, fatherName, location, phone, description, guarantor, accountType, accountTitle, accountNumber } = formData
    const res = await fetch("https://iqbalsons-api.herokuapp.com/addAccount", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name, fatherName, location, phone, description, guarantor, accountType, accountTitle, accountNumber
      })
    })
    const data = await res.json()
    if (data.status === 422 || !data) {
      window.alert("Invalid Registration")
    } else {
      window.alert("Account Created!")
      handleClose()
      forceUpdate()
      handleClearData()
    }

  }

  let name, value, clearData;
  const handleTyping = (e) => {
    name = e.target.name;
    value = e.target.value;
    setFormData({ ...formData, [name]: value })

  }
  const handleClearData = (e) => {
    clearData = {
      name: '', fatherName: '', location: '', phone: '', description: '', guarantor: '', accountType: 'zameendar',
      accountTitle: '', accountNumber: ''
    }
    setFormData(clearData)
  }
  const ThisIsOnClick = (id) => {
    window.location.assign(`http://localhost:3000/TafseelKhata/` + id);
    console.log(id)
  }


  return (
    <div>
      <div className="container" style={{ marginBottom: 10 }}>
        <div style={{ margin: 10 }}>
          <Button variant="outlined" onClick={handleClickOpen}>
            New Khata
          </Button>
          <div >
            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
          </div>
        </div>

        <Divider />
      </div>
      {/* Table Here */}
      <div style={{float:'left'}}>
        <Typography >Entries: {accounts.length}</Typography>
        <TableContainer component={Paper} sx={{ maxHeight: 500, maxWidth: 1000 }}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead sx={{ bgcolor: '#01987A' }} >
            <TableRow  >
              <TableCell><Typography sx={{ color: 'white' }}>ID</Typography></TableCell>
              <TableCell><Typography sx={{ color: 'white' }}>NAME</Typography></TableCell>
              <TableCell align="right"><Typography sx={{ color: 'white' }}>BALANCE</Typography></TableCell>
              <TableCell align="right"><Typography sx={{ color: 'white' }}>DETAILS</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {accounts.map((account, index) => (
              <TableRow
                key={account._id}
                sx={index % 2 ? { bgcolor: "#D3d3d3" } : { background: "white", '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell><Typography sx={index % 2 ? { color: '#01987A' } : { color: 'black' }}>{index + 1}</Typography></TableCell>
                <TableCell component="th" scope="row">
                  <Typography sx={index % 2 ? { color: '#01987A' } : { color: 'black' }}>
                    {account.name + " wald " + account.fatherName + " @ " + account.location}
                  </Typography>
                </TableCell>
                <TableCell align="right"><Typography sx={index % 2 ? { color: '#01987A' } : { color: 'black' }}>{account.balance}</Typography></TableCell>
                <TableCell align="right"><IconButton size='small' onClick={() => ThisIsOnClick(account._id)}>
                  <EditIcon color="success" />
                </IconButton></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer></div>
      
      {/* Modal Here */}
      <Dialog open={open} onClose={handleClose} maxWidth="md"  >
        <DialogTitle sx={{ color: '#01987A', textAlign: 'center', bgcolor: '#D3d3d3' }}><Typography variant='h5'>New Account</Typography></DialogTitle>
        <DialogContent sx={{ alignContent: 'center', textAlign: 'center', color: '#01987A' }}>
          <form method="post">
            {/* This Is For Selecting which Account Type is crediting or Debiting */}
            <div style={{ margin: 20 }}>
              <Typography>Select Account Type</Typography>
              <ToggleButtonGroup
                color="primary"
                value={formData.accountType}
                exclusive
                onChange={handleAccountTypeChange}

                name="accountType"
                id="accountType"
                size='large'
              >
                <ToggleButton value="zameendar" >Zameendar</ToggleButton>
                <ToggleButton value="khareedar" >Khareedar</ToggleButton>
                <ToggleButton value="bank" >Bank</ToggleButton>
                <ToggleButton value="inner" >Androon</ToggleButton>
              </ToggleButtonGroup></div>
            <br />
            <div style={{ float: 'left' }} >
              <Typography >Name*</Typography>
              <TextField id="name" name="name" size='small' value={formData.name} label="name" variant="outlined" onChange={handleTyping} />
            </div>
            {BankShow ? <div style={{ float: 'left' }}>
              <Typography >Father Name</Typography> <TextField size='small' id="fatherName" name="fatherName" value={formData.fatherName} label="fatherName" variant="outlined" onChange={handleTyping} />
              </div> : null}
            {BankShow ?
              <div style={{ float: 'left' }}>
                <Typography >Location</Typography>
                <TextField size='small' id="location" name="location" value={formData.amount} label="location" variant="outlined" onChange={handleTyping} />
              </div> : null}

            <TextField id="phone" value={formData.phone} name="phone" label="phone" variant="outlined" size='small' onChange={handleTyping} />



            {BankShow ? <TextField id="guarantor" value={formData.guarantor} name="guarantor" label="guarantor" variant="outlined" size='small' onChange={handleTyping} /> : null}
            {BankShow ? null : <TextField id="accountTitle" value={formData.accountTitle} name="accountTitle" label="accountTitle" variant="outlined" size='small' onChange={handleTyping} />}
            {BankShow ? null : <TextField id="accountNumber" value={formData.accountNumber} name="accountNumber" label="accountNumber" variant="outlined" size='small' onChange={handleTyping} />}
            
          <TextareaAutosize minRows={3} id="descriprion" value={formData.description} name="description" label="Description" variant="outlined" size='small' onChange={handleTyping} ></TextareaAutosize>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClearData}>Clear Data</Button>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleInsert}>Insert Data</Button>

        </DialogActions>
      </Dialog>
    </div>
  );
}
