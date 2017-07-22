import React, { Component } from 'react';

class ListBids extends Component {
    constructor(props) {
        super(props);

        this.state = { data: [] }
    }
    componentDidMount() {
        fetch('http://localhost:8000/api-bids/')
            .then(res => res.json())
            .then(data => this.setState({ data: data }));
    }
    
  render() {
    return (      
      <div className="container">
        <div className="row">        
          <table className="table table-bordered table-hover">
            <thead>
              <tr>        
                <th>ФИО</th>
                <th>email</th>
                <th>немного о себе</th>
                <th>место работы</th>        
                <th>прикрепление фото</th>
                <th>откуда узнали о нас</th>
                <th>дата подачи заявки</th>
              </tr>
            </thead>
            <tbody>  
            {this.state.data.map((items,index) => (          
              <tr key={index}>        
                <td>{items.bid_fio}</td>
                <td>{items.bid_email}</td>
                <td>{items.bid_about}</td>
                <td>{items.bid_job}</td>
                <td><img alt="100%x200"  src={items.bid_photo} data-holder-rendered="true" 
              style={{height:'50px', width:'50px', display: 'block'}} /></td>
                <td>{items.bid_from}</td>
                <td>{items.bid_date}</td>
              </tr>  
              ))}        
            </tbody>
          </table>
        </div>           
      </div>              
        
    )}
}

export default ListBids;