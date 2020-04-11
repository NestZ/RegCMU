import React , { Component } from 'react';
import 'bulma/css/bulma.css'
import coursedata from './coursetabledata';

export default class Course extends Component  {
  state = {
    isLoading: true,
    users: [],
    error: null,
    coursedata : []
  }

  refreshPage() {
    window.location.reload(false);
  }
 aler(){
  alert("Can not register!!!!");
 }

 aler1(){
  alert("Register Succes!!!!");
 }

 checktimed(Id){
   var i =0
  if(this.state.users === null)
    return true
  else{
    for(i=0;i<this.state.users.length;i++){
     if(this.state.users[i].day === this.state.coursedata[Id].day){
       if(this.state.users[i].time === this.state.coursedata[Id].time){
        return false
     }
    }
   }
  return true
  }
}

 checkcourse() {
    var i=0,j=0
    for(i=0;i<this.state.users.length;i++){
      for(j=0;j<this.state.coursedata.length;j++){  
        if(this.state.users[i].id === this.state.coursedata[j].id){
        this.state.coursedata.splice(j,1)
        }
      }
    }
    this.setState({coursedata:this.state.coursedata})
  }

  Register = (Id) =>{
    if(this.checktimed(Id)){
      this.aler1()
      fetch('/reg',{
        method :'POST',
        body:JSON.stringify(this.state.coursedata[Id]),
        headers :{
          'Content-Type' : 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('token')
        },
      })
      // this.refreshPage()
      .then(response=>{
        if(response.status===200){
          delete this.state.coursedata[Id]
          this.setState({coursedata:this.state.coursedata})
        }
      });
    }
    else{
      this.aler()
    }
}

  fetchUsers() {
    fetch('/me/course', {
        method : 'Get',
        headers : {
            'Authorization' : 'Bearer ' + sessionStorage.getItem('token')
        }
    })
    .then(response => response.json())
    .then(data =>{
      this.setState({
          users: data.courses,
          isLoading: false,
      });
      this.checkcourse();
    })
    .catch(error => this.setState({ error, isLoading: false }));
  }

  componentDidMount() {
      this.fetchUsers();
  }

  render(){
    return (
      <div className="is-fullheight">
          <section className="hero is-info is-bold">
            <div className="hero-body">
              <div className="container">
                <h1 className="title">
                  Registration Office
                </h1>
                <h2 className="subtitle">
                  Chiang Mai University
                </h2>
              </div>
            </div>
          </section>
    <div className="contianer">
        <div className="column is-three-fifths is-offset-one-fifth">
        <table className="table is-striped is-narrow is-hoverable is-fullwidth pricing__table is-fullwidth" id="dataTable">
                                <thead>
                                    <tr>
                                        <th>CourseID</th>
                                        <th>Title</th>
                                        <th>Day</th>
                                        <th>Time</th>
                                        <th>Credit</th>
                                        <th>Register</th>
                                    </tr>
                                </thead>
        {this.state.coursedata.map((user,Id) => {
                        const {id,name,credits,time,day} = user;
                        return(
                                    <tbody id={this.name}>
                                    <td>{id}</td>
                                    <td>{name}</td>
                                    <td>{day}</td>
                                    <td>{time}</td>
                                    <td>{credits}</td>
                                    <td><button className="button is-success" type="button" key={coursedata.id} onClick = {() => this.Register(Id)}>Register</button></td>
                                </tbody>
                            
                        );
        }
        )
     }
        </table>
        </div>
      </div>
      </div>
    )
  }
}


