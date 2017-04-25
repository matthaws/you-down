import React from 'react';
import ReactDOM from 'react-dom';
import VideoBar from './video_bar';
import Modal from 'react-modal';
import AuthForm from './auth_form';
import { modalStyle } from '../../util/modal_util';

class Welcome extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modalOpen: false,
    };

    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
  }

  closeModal() {
    this.setState({ modalOpen: false })
  }

  openModal() {
    this.setState({ modalOpen: true })
  }

  render () {
    return (
  <section className="welcome">
      <div id="videoMessage">
        <h1>Fun People, Fun Stuff</h1>
        <h3>Are <i>you</i> down?</h3>
        <button className="main-button" onClick={this.openModal}>Sign Up</button>
        <Modal
          style={ modalStyle }
          contentLabel="auth_form"
          className="auth-form"
          isOpen={this.state.modalOpen}
          onRequestClose={this.closeModal}>
          <AuthForm closeModal={this.closeModal} formType="signup" />
        </Modal>
      </div>
      <VideoBar />
    <div className="placeholder">
      <h1>Explore</h1>
      <div >
      <ul className="category-list">
        <li>
          <ul>
            <li><img src={window.images.outdoors} /></li>
            <li>Outdoors & Adventure</li>
          </ul>
        </li>
        <li>
          <ul>
            <li><img src={window.images.tech} /></li>
            <li>Technology</li>
          </ul>
        </li>
        <li>
          <ul>
            <li><img src={window.images.learning} /></li>
            <li>Learning</li>
          </ul>
        </li>
        <li>
          <ul>
            <li><img src={window.images.food} /></li>
            <li>Food & Drink</li>
          </ul>
        </li>
        <li>
          <ul>
            <li><img src={window.images.writing} /></li>
            <li>Writing</li>
          </ul>
        </li>
        <li>
          <ul>
            <li><img src={window.images.lgbt} /></li>
            <li>LGBTQ</li>
          </ul>
        </li>
        <li>
          <ul>
            <li><img src={window.images.games} /></li>
            <li>Games</li>
          </ul>
        </li>
        <li>
          <ul>
            <li><img src={window.images.bookclub} /></li>
            <li>Book Clubs</li>
          </ul>
        </li>
        <li>
          <ul>
            <li><img src={window.images.pets} /></li>
            <li>Pets</li>
          </ul>
        </li>
        <li>
          <ul>
            <li><img src={window.images.crafts} /></li>
            <li>Hobbies & Crafts</li>
          </ul>
        </li>
        <li>
          <ul>
            <li><img src={window.images.social} /></li>
            <li>Social</li>
          </ul>
        </li>
        <li>
          <ul>
            <li><img src={window.images.business} /></li>
            <li>Career & Networking</li>
          </ul>
        </li>
      </ul>
      </div>
    </div>
  </section>
);
 }
}
export default Welcome;
