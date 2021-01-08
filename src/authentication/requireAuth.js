import React, { Component } from 'react';
import { connect } from 'react-redux';

// eslint-disable-next-line
export default (ComposedComponent) => {
   class requireAuth extends Component {
      componentDidMount() {
      //   console.log(this.props.auth)
        if (!this.props.auth){
            this.props.history.push("/");
        }
      }
      componentDidUpdate() {
         if (!this.props.auth)
            this.props.history.push("/");
      }
      render() {
         //  console.log(this.props)
        // if (!this.props.auth){
        //     this.props.history.push("/");
        // }
        return (
           <ComposedComponent { ...this.props } />
        )
      }
   }
   function mapStateToProps(state) {
      //  console.log(state);
        return {
            auth: state.auth.storedData
        }
    }
   return connect(mapStateToProps)(requireAuth);
}