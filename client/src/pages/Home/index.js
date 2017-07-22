import React, { Component } from 'react';
import Modal from 'react-modal';
import DjangoCSRFToken from 'django-react-csrftoken';
import $ from "jquery";



const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class AppModal extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      csvFile: ''      
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this); 
    this.handleSubmit = this.handleSubmit.bind(this);   
    this.changeFile = this.changeFile.bind(this);   
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }  
  changeFile(e) {
    this.setState({csvFile: e.target.files[0]});
  }

  handleSubmit(event) {    
    event.preventDefault();         
    let data = new FormData();
    data.append('bid_photo', this.state.csvFile);
    data.append('bid_fio', this.refs.bid_fio.value);
    data.append('bid_email', this.refs.bid_email.value);
    data.append('bid_about', this.refs.bid_about.value);
    data.append('bid_job', this.refs.bid_job.value);
    data.append('bid_event', this.props.event_id);
    data.append('bid_from', this.refs.bid_from.value);
    data.append('csrfmiddlewaretoken', $("input[name='csrfmiddlewaretoken']").val());
    
    $.ajax({
      type: "POST",
      url: "http://localhost:8000/post/",
      data: data,
      dataType: "JSON",
      processData: false,
      contentType: false,      
    }).done(function (json) {
      alert("Ваша заявка принята");
    });
    this.setState({modalIsOpen: false});                        
  }

  render() {
    return (
      <div>
        <button onClick={this.openModal}>Подать заявку</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >

          <h2 ref={subtitle => this.subtitle = subtitle}>Подача заявки на мероприятие {this.props.event_id}</h2>          
          <form onSubmit={this.handleSubmit} id="mainForm" enctype="multipart/form-data">    
          <DjangoCSRFToken className="test"/>
            <div className="form-group">
            <label>ФИО</label>
            <input type="text" required ref="bid_fio" name="bid_fio" className="form-control" placeholder="ФИО"/>
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" required ref="bid_email" name="bid_email" className="form-control" placeholder="Email"/>
          </div>
          <div className="form-group">
            <label>Немного о себе</label>
            <input type="text" ref="bid_about" name="bid_about" className="form-control" placeholder="О себе"/>
          </div>
        <div className="form-group">
            <label>Место работы</label>
            <input type="text" ref="bid_job" name="bid_job" className="form-control" placeholder="Место работы"/>
          </div>
        <div className="form-group">
            <label>Откуда узнали о нас</label>
            <input type="text"  ref="bid_from" name="bid_from" className="form-control" placeholder="Откуда узнали о нас"/>
          </div>
          <div className="form-group">
            <label>Фото</label>
            <input type="file" required id="file" ref="file" name="bid_photo" onChange={this.changeFile}/>    
          </div>  
          <input type="hidden" value={this.props.event_id} name="bid_event"/>
          <input type="submit" value="Submit" />
          <button onClick={this.closeModal} className="btn btn-default">Отмена</button>
        </form>         
        </Modal>
      </div>
    );
  }
}


class Home extends Component {
    constructor() {
        super();

        this.state = {data: [] }
    }

    componentDidMount() {
        fetch('http://localhost:8000/api-events/')
            .then(res => res.json())
            .then(data => this.setState({ data: data }));
    }
    
  render() {
    return (      
        <div className="container">
        <div className="row">
        {this.state.data.map((items,index) => (
          <div className="col-sm-6 col-md-3">
            <div className="thumbnail">      
              <img alt="100%x200"  src={items.event_photo} data-holder-rendered="true" 
              style={{height:'200px', width:'100%', display: 'block'}} />
              <div key={index} className="caption">
                <h3>{items.event_title}</h3>
                <p>{items.event_text.substring(0,90)}...</p>
                <p>{items.event_date}</p>                                                
                <AppModal event_id={items.id} />
              </div>
            </div>
          </div>
        ))}
        </div>           
        </div>         
    )}
}

export default Home;

