import React from 'react';
// import styled from 'styled-components';
import axios from 'axios';
import ShowAllHistoryEntry from './ShowAllHistoryEntry.jsx';

class ShowAllHistory extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      history: [],
      latestHistory: []
    }
  }

  shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
  }

  getHistory() {
    axios.get('/products')
      .then((response) => {
        this.setState({
          history: this.shuffleArray(response.data)
        })
      })
      .then(() => {
        this.setState({
          latestHistory: this.state.history.slice(0,10)
        })
      })
      .catch((err) => console.error(err));
  }

  componentDidMount() {
    this.getHistory();
  }

  render() {
    return (
      <div className="as-showHistoryWrapper">
        {/* <span> */}
          <div className="as-styledHistory">
            {this.state.latestHistory.map((item, index) => (
              <ShowAllHistoryEntry product={item} key={index} />
            ))}
          </div>
          <span className="as-styledShowHistory">Show all history</span>
        {/* </span> */}
      </div>
    )
  }

}

export default ShowAllHistory;
  // render() {
  //   return (
  //     <div>
  //       <StyledHistory>
  //         {this.state.latestHistory.map((item, index) => (
  //           <div className="productimage" style={{
  //             paddingLeft: '15px',
  //             paddingRight: '15px'
  //           }}>
  //             <img src={item.itemimage} key={index} height="70" width="70"/>
  //           </div>
  //         ))}
  //       </StyledHistory>
  //       <StyledShowHistory >Show all history</StyledShowHistory>
  //     </div>
  //   )
  // }