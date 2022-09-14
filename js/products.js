'use strict';
const e = React.createElement;

class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [],error: null, isLoaded: false };
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return console.log(error.message);
    } else if (!isLoaded) {
      return 'Loading...';
    } else {      
      return (
        <ul>
          {items.map(item => (
            <li key={item.name}>
              {item.name}
            </li>
          ))}
        </ul>
      );
    }
  }

  componentDidMount() {
    fetch("https://pokeapi.co/api/v2/pokemon/?limit=100")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.results
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }
}

const domContainer = document.querySelector('#products_container');
const root = ReactDOM.createRoot(domContainer);
root.render(e(Products));