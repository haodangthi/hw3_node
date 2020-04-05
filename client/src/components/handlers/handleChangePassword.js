
export function handleChangePassword (event) {
  this.setState({
    password: event.target.value
  });
  console.log(this.state.password)
}