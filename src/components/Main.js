import React, { Component } from 'react'
import axios from 'axios'
import Spinner from 'react-bootstrap/Spinner'
import CardGroup from 'react-bootstrap/CardGroup'
import MainCards from './MainCards'
const serverUrl = process.env.REACT_APP_SERVER_URL

export class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      practiceData: []
    }
  }
  componentDidMount = () => {
    axios.get(`${serverUrl}/apidata`).then(response => {

      this.setState({
        practiceData: response.data
      })
      // alert('got the data')
    }).catch(error => alert(error.message))
  }
  handleAddToFavorite=(item)=>{
    // console.log(item.name,item.level,item.img)
    const reqBody={
      name:item.name,
      img:item.img,
      level:item.level
    }
    axios.post(`${serverUrl}/favorit`,reqBody).then(response=>{
      if(response.data==="already exist"){
        alert('the item exist in your favorite list')
      }
      else{
        alert('added successfully')
      }
    }).catch(error=>alert(error.message))
  }
  render() {
    return (
      <div>
        {
          this.state.practiceData.length > 0 ?
            <CardGroup>
              {this.state.practiceData.slice(0,10).map((value,idx)=>{
                return(
                  <MainCards
                    key={idx}
                    name={value.name}
                    img={value.img}
                    level={value.level}
                    handleAddToFavorite={this.handleAddToFavorite}
                  />
                )
              })}
            </CardGroup>
            :
            <Spinner animation="border" />
        }
      </div>
    )
  }
}

export default Main
