import { useState, useRef } from 'react';
import './App.css'

import { Container, TextField, Button, List, ListItem, Typography, Box, Divider, IconButton } from '@mui/material';

import {Delete, Edit} from '@mui/icons-material';

function App() {
  let[item, setItem] = useState('')
  let[items, setItems] = useState([])
  let inputRef = useRef(null)
  let[toggle, setToggle] = useState({show:false,id:""})

  let changeItem=(e)=>{
    setItem(e.target.value)
  }

  let addItems=()=>{
    setItems([...items, item])
    setItem('')
    setToggle({show:false})
  }

  let deleteItem=(id)=>{
    let res = items.filter((_,index)=>{
      return (id!==index)
    })
    setItems(res)
  }

  let editItem=(id)=>{
    inputRef.current.focus()
    setItem(items[id])
    setToggle({show:true,id})
  }

  let updatedItem=()=>{
    items[toggle.id] = item
    setItems([...items])
    setToggle({show:false})
    setItem('')
  }

  return (
    <Container maxWidth='sm' sx={{textAlign:'center', paddingTop:'2rem'}}>
      <Typography variant="h4" gutterBottom>To-Do list</Typography>

      <TextField variant='outlined' label='add item or edit item' fullWidth onChange={changeItem} inputRef={inputRef} value={item} sx={{marginBottom:"1.5rem", backgroundColor: "#f9f9f9", borderRadius:"5px"}}></TextField>

      <Box display="flex" gap={2} my={2} justifyContent="center">
        <Button variant='contained' color='success' onClick={addItems}
        sx={{
          backgroundColor:"#4caf50",
          fontWeight:"bold"
        }}
        >
          Add
        </Button>

        {toggle.show && 
          (<Button variant='contained' color='primary' onClick={updatedItem} 
          sx={{
          backgroundColor:"#1976d2",
          fontWeight:"bold"
          }}>Update
          </Button>
          )
        }
      </Box>

      <Divider sx={{margin:'1rem 0', borderColor:"#1976d2"}}/>

      <List sx={{maxWidth:"100%", bgcolor:"background.paper", borderRadius:"5px"}}>
        {items.map((ele,index)=>(
          <ListItem 
            key={index} sx={{
              display:"flex",
              justifyContent:"space-between",
              marginBottom:"0.5rem",
              padding:"0.5rem 1rem",
              borderRadius:"5px",
              bgcolor:"#f5f5f5"
            }}>
            <Typography sx={{fontWeight:"500",color:"424242"}}>{ele}</Typography>
            <Box display="flex" gap={1}>
              <IconButton edge="end" onClick={()=>{deleteItem(index)}}  color="error">
                <Delete/>
              </IconButton>
              <IconButton edge="end" onClick={()=>{editItem(index)}}  color="secondary">
                <Edit/>
              </IconButton>
            </Box>
            
          </ListItem>
        ))}
      </List>
    </Container>
  )
}

export default App
