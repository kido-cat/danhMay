import React from 'react';
import './Form.css';
  class Form extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          array: [
            "khi", "bạn", "không", "xéo", "bạn", "tách", "hình", "sự", "ngã", "ngũ", "luôn", "trời", "thiên", "hướng", "nam",
            "cảm", "ơn", "dũng", "xã", "hội", "thanh", "toán", "ngon", "ngủ", "thử", "da", "thanh", "niên", "tỉnh", "tháng",
            "hãy", "kính", "hạnh", "phúc", "ngữ", "văn", "khoa", "sinh", "hà", "nội", "màu", "ngành", "có", "rằng", "liệu",
            "trường", "quảng", "ra", "thản", "thanh", "lịch", "ngô", "tội", "việc", "hàng", "minh", "thang", "cậu", "cười", "giữ"
          ],
          arrayTyping: [],
          currentWord: 0,
          time: 60,
          countWordCorrect: 0,
          countWordWrong: 0,
          timeCount: false
        }
      }
      handleStartTyping = () => {
        let timeWord = this.state.time;
        let count = 0;
    
        this.timer = setInterval(() => {
          count = count + 1;
          if (count <= 60) {
            this.setState({ time: timeWord - count });
            if (count == 60) {
              this.handleClearInterval();
              this.setState({ timeCount: false });
            }
          }
        }, 1000);
      }
      handleClearInterval = () => {
        clearInterval(this.timer);
        this.handleCompare();
      }
    
      handleCompare = () => {
        let array = this.state.array;
        let arrayTyping = this.state.arrayTyping;
        let countWordCorrect = this.state.countWordCorrect;
        let countWordWrong;
    
        for (var i = 0; i <= arrayTyping.length; i++) {
          if (arrayTyping[i] === array[i]) {
            countWordCorrect += 1;
          }
        }
    
        countWordWrong = arrayTyping.length - countWordCorrect;
        this.setState({ countWordCorrect: countWordCorrect, countWordWrong: countWordWrong });
      }
    
      onChange = (event) => {
        let txtText = event.target.value;
        let results = txtText.split(/\s+/).join(' ');
        let valueTimeCount = (txtText.length === 1) ? true : false;
        
        if (valueTimeCount === true) this.handleStartTyping();
        this.setState({ arrayTyping: results.split(" "), timeCount: valueTimeCount, 
          currentWord: results.split(" ").length - 1 })
      }
    render() {
        var { array, countWordCorrect, countWordWrong, time, currentWord } = this.state;
        var element = array.map((element, index) =>
          <span key={index} className={index === currentWord ? index + " highlight" : index}>{element + " "}</span>
        );
        return (
          <div className="container">
            <div className="panel panel-primary panel-typing">
              <div className="panel-heading"><h3>Website kiểm tra tốc độ gõ bàn phím đơn giản</h3></div>
              <div className="panel-body">
                <div className="item-character">
                  {element}
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Input</label><br />
                    <input className="form-control"
                      placeholder="Please input typing"
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="col-md-4">
                    <label>Word wrong</label>
                    <p>{countWordWrong}</p>
                  </div>
                  <div className="col-md-4">
                    <label>Time</label><br />
                      <p id="show-time">
                        {time}
                      </p>
                  </div>
                  <div className="col-md-4">
                    <label>Word correct</label>
                    <p>{countWordCorrect}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }
  }

export default Form;