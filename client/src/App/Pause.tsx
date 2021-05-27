/**
 * Component displaying a Pause screen.
 */

const Pause = () => {
  return (
    <div className="message is-danger">
      <div className="message-header">Sorry!</div>
      <div className="message-body">
        <p>Too many players are paused. </p>
        <p>Please wait for them and start their session again!</p>
      </div>
    </div>
  )
}

export default Pause
