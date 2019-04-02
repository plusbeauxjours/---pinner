import React from "react";
// import styled from "styled-components";

// const Container = styled.div``;

// * {
// 	margin: 0;
// 	padding: 0;
// 	box-sizing: border-box;
// }

// .app {
// 	position: relative;
// 	width: 100%;
// 	height: 100vh;
// 	overflow: hidden;
// }

// .card {
// 	width: 300px;
// 	height: 400px;
// 	position: absolute;
// 	border-radius: 10px;
// 	position: absolute;
// 	left: 0;
// 	right: 0;
// 	margin-left: auto;
// 	margin-right: auto;
// 	transform-origin: center;
// 	margin-top: auto;
// 	margin-bottom: auto;
// 	top: 0;
// 	bottom: 0;
// 	cursor: -webkit-grab;
// 	-webkit-transform-style: preserve-3d;
// 	transform-style: preserve-3d;
// 	-webkit-transform: perspective(800px);
// 	transform: perspective(800px);
// }
// .color0 {
// 	background-image: linear-gradient(to right, #43e97b 0%, #38f9d7 100%);
// }
// .color1 {
// 	background-image: linear-gradient(
// 		to top,
// 		#3f51b1 0%,
// 		#5a55ae 13%,
// 		#7b5fac 25%,
// 		#8f6aae 38%,
// 		#a86aa4 50%,
// 		#cc6b8e 62%,
// 		#f18271 75%,
// 		#f3a469 87%,
// 		#f7c978 100%
// 	);
// }

// .color2 {
// 	background-image: linear-gradient(
// 		to top,
// 		#dbdcd7 0%,
// 		#dddcd7 24%,
// 		#e2c9cc 30%,
// 		#e7627d 46%,
// 		#b8235a 59%,
// 		#801357 71%,
// 		#3d1635 84%,
// 		#1c1a27 100%
// 	);
// }

// .color3 {
// 	background-image: linear-gradient(to top, #0250c5 0%, #d43f8d 100%);
// }

// .color4 {
// 	background-image: linear-gradient(to top, #c7eafd 0%, #e8198b 100%);
// }

// .text {
// 	text-align: center;
// 	font-family: "Montserrat", sans-serif;
// 	font-size: 28px;
// 	font-weight: 900;
// 	font-style: italic;
// 	margin-top: 50px;
// 	color: #fff;
// 	-webkit-touch-callout: none;
// 	-webkit-user-select: none;
// 	-khtml-user-select: none;
// 	-moz-user-select: none;
// 	-ms-user-select: none;
// 	user-select: none;
// }

interface IProps {
  key: number;
  no: number;
}

interface IState {
  active: boolean;
  move: boolean;
  limit: boolean;
  mouseStartPosX: number;
  mouseStartPosY: number;
  mouseCurrPosX: number;
  mouseCurrPosY: number;
  Posx: number;
  Posy: number;
  k: number;
  restX: number;
  restY: number;
  fx: number;
  fy: number;
  ax: number;
  ay: number;
  vx: number;
  vy: number;
  mass: number;
  damping: number;
}

class MatchPresenter extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      move: false,
      limit: false,
      mouseStartPosX: null,
      mouseStartPosY: null,
      mouseCurrPosX: null,
      mouseCurrPosY: null,
      Posx: null,
      Posy: null,
      k: 0.2,
      restX: 0,
      restY: 0,
      fx: 0,
      fy: 0,
      ax: 0,
      ay: 0,
      vx: 0.0,
      vy: 0.0,
      mass: 0.7,
      damping: 0.8
    };
    this.handleDown = this.handleDown.bind(this);
    this.handleUp = this.handleUp.bind(this);
    this.handleMove = this.handleMove.bind(this);
    this.animate = this.animate.bind(this);
    this.updateCard = this.updateCard.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
  }

  public componentDidMount() {
    this.animate();
  }

  public render() {
    return (
      <div
        id={"card" + this.props.no}
        className={"card color" + this.props.no}
        onMouseDown={this.handleDown}
        onMouseMove={this.handleMove}
        onMouseUp={this.handleUp}
        onMouseLeave={this.handleUp}
        onTouchStart={this.handleTouchStart}
        onTouchMove={this.handleTouchMove}
        onTouchEnd={this.handleTouchEnd}
      >
        <div className="text">DRAG THE CARD LEFT OR RIGHT</div>
      </div>
    );
  }

  public handleDown(e) {
    this.setState({
      move: true,
      active: true,
      mouseStartPosX: e.clientX,
      mouseStartPosY: e.clientY
    });
  }

  public handleTouchStart(e) {
    e.persist();
    this.setState({
      move: true,
      active: true,
      mouseStartPosX: e.touches[0].screenX,
      mouseStartPosY: e.touches[0].screenY
    });
    console.log(this.state.mouseStartPosX);
  }

  public handleMove(e) {
    if (!this.state.limit) {
      if (this.state.move) {
        let mouseCurrPosX = e.clientX;
        let mouseCurrPosY = e.clientY;
        let Posx = mouseCurrPosX - this.state.mouseStartPosX;
        let Posy = mouseCurrPosY - this.state.mouseStartPosY;
        let el = document.getElementById("card" + this.props.no);
        let height = window.innerHeight;
        let width = window.innerWidth;
        let maxX = width - (width * 20) / 100;
        function map_range(value, low1, high1, low2, high2) {
          return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
        }
        let mouseRange = mouseCurrPosX;
        if (mouseRange < width / 2) {
          mouseRange = width - mouseRange;
        }
        let damping = map_range(
          mouseRange,
          width / 2,
          width - (width * 10) / 100,
          0.6,
          0.8
        );

        this.setState({
          Posx,
          Posy,
          damping,
          mouseCurrPosX,
          mouseCurrPosY
        });

        if (mouseCurrPosX > width - (width * 20) / 100) {
          let restX, restY;
          if (mouseCurrPosX > width / 2) {
            restX = this.state.Posx * 5;
          } else {
            restX = -this.state.Posx * 5;
          }
          if (mouseCurrPosY > height / 2) {
            restY = this.state.Posy * 5;
          } else {
            restY = this.state.Posy * 5;
          }
          let limit = true;
          let move = false;
          let damping = 0.06;
          this.setState(
            {
              restX,
              restY,
              limit,
              move,
              damping
            },
            () => {
              setTimeout(() => {
                window.cancelAnimationFrame(this.animate);
              }, 10);
            }
          );
        } else if (mouseCurrPosX < (width * 20) / 100) {
          let restX, restY;
          if (mouseCurrPosX > width / 2) {
            restX = -this.state.Posx * 5;
          } else {
            restX = this.state.Posx * 5;
          }
          if (mouseCurrPosY > height / 2) {
            restY = this.state.Posy * 5;
          } else {
            restY = this.state.Posy * 5;
          }
          let limit = true;
          let move = false;
          let damping = 0.06;
          this.setState({
            restX,
            restY,
            limit,
            move,
            damping
          });
        }
      }
    }
  }

  public handleTouchMove(e) {
    e.persist();
    if (!this.state.limit) {
      if (this.state.move) {
        let mouseCurrPosX = e.touches[0].screenX;
        let mouseCurrPosY = e.touches[0].screenY;
        let Posx = mouseCurrPosX - this.state.mouseStartPosX;
        let Posy = mouseCurrPosY - this.state.mouseStartPosY;
        let el = document.getElementById("card" + this.props.no);
        let height = window.innerHeight;
        let width = window.innerWidth;
        let maxX = width - (width * 20) / 100;
        function map_range(value, low1, high1, low2, high2) {
          return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
        }
        let mouseRange = mouseCurrPosX;
        if (mouseRange < width / 2) {
          mouseRange = width - mouseRange;
        }
        let damping = map_range(
          mouseRange,
          width / 2,
          width - (width * 10) / 100,
          0.6,
          0.8
        );

        this.setState({
          Posx,
          Posy,
          damping,
          mouseCurrPosX,
          mouseCurrPosY
        });

        if (mouseCurrPosX > width - (width * 10) / 100) {
          let restX, restY;
          if (mouseCurrPosX > width / 2) {
            restX = this.state.Posx * 5;
          } else {
            restX = -this.state.Posx * 5;
          }
          if (mouseCurrPosY > height / 2) {
            restY = this.state.Posy * 5;
          } else {
            restY = this.state.Posy * 5;
          }
          let limit = true;
          let move = false;
          let damping = 0.08;
          this.setState(
            {
              restX,
              restY,
              limit,
              move,
              damping
            },
            () => {
              setTimeout(() => {
                window.cancelAnimationFrame(this.animate);
              }, 10);
            }
          );
        } else if (mouseCurrPosX < (width * 10) / 100) {
          let restX, restY;
          if (mouseCurrPosX > width / 2) {
            restX = -this.state.Posx * 5;
          } else {
            restX = this.state.Posx * 5;
          }
          if (mouseCurrPosY > height / 2) {
            restY = this.state.Posy * 5;
          } else {
            restY = this.state.Posy * 5;
          }
          let limit = true;
          let move = false;
          let damping = 0.08;
          this.setState({
            restX,
            restY,
            limit,
            move,
            damping
          });
        }
      }
    }
  }

  public handleUp() {
    this.setState({
      move: false
    });
  }

  public handleTouchEnd() {
    this.setState({
      move: false
    });
  }

  public updateCard() {
    if (!this.state.move) {
      this.setState(
        {
          fx: -this.state.k * (this.state.Posx - this.state.restX),
          fy: -this.state.k * (this.state.Posy - this.state.restY)
        },
        () => {
          this.setState(
            {
              ax: this.state.fx / this.state.mass,
              ay: this.state.fy / this.state.mass
            },
            () => {
              this.setState(
                {
                  vx: this.state.damping * (this.state.vx + this.state.ax),
                  vy: this.state.damping * (this.state.vy + this.state.ay)
                },
                () => {
                  this.setState({
                    Posx: this.state.Posx + this.state.vx,
                    Posy: this.state.Posy + this.state.vy
                  });
                }
              );
            }
          );
        }
      );
    }
  }

  public animate() {
    let el = document.getElementById("card" + this.props.no);
    if (
      this.state.Posx > window.innerWidth + 400 ||
      this.state.Posx < -window.innerWidth - 400
    ) {
      cancelAnimationFrame(this.animate);
    } else {
      requestAnimationFrame(this.animate);
    }
    if (this.state.active) {
      el.style.transform =
        "translate(" +
        this.state.Posx +
        "px" +
        "," +
        this.state.Posy +
        "px) rotate(" +
        this.state.Posx / 9 +
        "deg) perspective(800px)";
      this.updateCard();
    }
  }
}

export default MatchPresenter;
