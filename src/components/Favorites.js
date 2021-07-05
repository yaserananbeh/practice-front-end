import React, { Component } from 'react'
import axios from 'axios'
import CardGroup from 'react-bootstrap/CardGroup'
import FavoriteCards from './FavoriteCards'
import UpdateForm from './UpdateForm'
const serverUrl = process.env.REACT_APP_SERVER_URL
export class Favorites extends Component {
  constructor(props) {
    super(props)
    this.state = {
      favoriteData: [],
      choosenItemUpdate:{},
      showForm:false
    }
  }
  componentDidMount = () => {
    axios.get(`${serverUrl}/favorit`).then(response => {

      this.setState({
        favoriteData: response.data
      })
      // alert('got the data')
    }).catch(error => alert(error.message))
  }
  removeFromFavorite= async (item)=>{
    await axios.delete(`${serverUrl}/favorit/${item.name}`).then(response=>{
      // console.log(response.data)
    }).catch(error=>alert(error.message))
    axios.get(`${serverUrl}/favorit`).then(response => {

      this.setState({
        favoriteData: response.data
      })
      // alert('got the data')
    }).catch(error => alert(error.message))
  }
  showUpdateForm=(item)=>{
    this.setState({
      choosenItemUpdate:item,
      showForm:!this.state.showForm
    })
  }
  updateApi=async (e)=>{
    e.preventDefault();
    const newname=e.target.name.value;
    const newimg=e.target.img.value;
    const newlevel=e.target.level.value;
    const itemName=this.state.choosenItemUpdate.name
    const reqBody={
      name:newname,
      img:newimg,
      level:newlevel
    }
    // console.log(itemName,reqBody)
    await axios.put(`${serverUrl}/favorit/${itemName}`,reqBody).then(response=>{
      this.setState({
        showForm:false
      })
    }).catch(error=>alert(error.message))
    axios.get(`${serverUrl}/favorit`).then(response => {

      this.setState({
        favoriteData: response.data
      })
      // alert('got the data')
    }).catch(error => alert(error.message))
  }
  render() {
    return (
      <div style={{textAlign:'center'}}>
        {
          this.state.showForm&& 
          <UpdateForm
            item={this.state.choosenItemUpdate}
            updateApi={this.updateApi}
          />
        }
        {
          this.state.favoriteData &&
            <CardGroup>
              {this.state.favoriteData.map((value, idx) => {
                return (
                  <FavoriteCards
                    key={idx}
                    name={value.name}
                    img={value.img}
                    level={value.level}
                    removeFromFavorite={this.removeFromFavorite}
                    showUpdateForm={this.showUpdateForm}
                  />
                )
              })}
            </CardGroup>
        }
      </div>
    )
  }
}

export default Favorites
